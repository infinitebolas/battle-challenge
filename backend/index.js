const express = require("express");
const app = express();
const mariadb = require('mariadb');
const crypto = require('crypto');
const cors = require('cors');

app.use(cors({
  origin: '*',
  methods:["POST","GET"],
credentials: false
}));
app.use(express.json());


const pool = mariadb.createPool({
host:'localhost',
user:'root',
password:'1Motdepasse',
database:'battlechallenge',
port:'3307'
});

async function initializeDatabase() {
  try {
    const conn = await pool.getConnection();
    await conn.query("INSERT INTO users(username,email,mdp,points) VALUES ('test','test@mail','123',45) ");
    console.log("Base de données initialisée");
  } catch (err) {
    console.error("Erreur lors de l'initialisation de la base de données :", err);
  }
  finally {
    conn.release(); 
  }
}

// async function verifyUser(info){
//   try{
//     const conn = await pool.getConnection()
//   }
// }

//initializeDatabase();

app.get("/classement", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query("SELECT username, points FROM users ORDER BY DESC");
      res.json(rows);
    } finally {
      conn.release(); 
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Database error");
  }
});

app.post("/auth/register", async (req, res) => {
  const { username, email, mdp } = req.body;

  if (!username || !email || !mdp) {
    return res.status(400).json({ success: false, message: "Champs manquants" });
  }

  let conn;

  try {
    conn = await pool.getConnection();

    const hash = crypto.createHash('sha256').update(mdp).digest('hex');

    try {
      await conn.query(
        "INSERT INTO users(username,email,mdp,points) VALUES (?,?,?,0)",
        [username, email, hash]
      );

      console.log("User created:", username);
      return res.status(200).json({ success: true, message:'Utilisateur créé' });

    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({success: false, message: "User or email already exists"});
      }
      throw err;
    }

  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({success: false, message: "Database error"});
  } finally {
    if (conn) conn.release();
  }
});

app.post("/auth/login",async (req,res) => {
  try{
    const {username, mdp} = req.body;
    const conn = await pool.getConnection();
    try{    
      let test=false;
      const hash = crypto.createHash('sha256').update(mdp).digest('hex');
      const [verif] = await conn.query("SELECT mdp FROM users WHERE username=?",[username]);
      if(hash==verif.mdp){
        test=true;
      }
      res.json({success:test});
    } finally{
      conn.release();
    }
  }
  catch{
    res.status(500).json("Database error");
  }
})
// async function verifMail(mail) {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const [rows]= await conn.query("SELECT COUNT(email) AS count FROM users WHERE email = ?", [mail]);
//     return Number(rows.count) == 0;
//   } catch (err) {
//     console.error("Erreur lors de la vérification de l'email :", err);
//     return false;
//   }
//   finally {
//     if (conn) conn.release(); 
//   }
// }


app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
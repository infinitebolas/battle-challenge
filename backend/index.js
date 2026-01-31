const express = require("express");
const app = express();
const mariadb = require('mariadb');
const crypto = require('crypto');
const cors = require('cors');

app.use(cors({origin: '*'}));
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

//initializeDatabase();

app.get("/classement", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query("SELECT username, points FROM users ");
      res.json(rows);
    } finally {
      conn.release(); 
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/auth/register", async (req, res) => {
  try {
    const { username, email, mdp } = req.body;
    const conn = await pool.getConnection();
    try {
      const hash = crypto.createHash('sha256');
      hash.update(mdp);
      const digest = hash.digest('hex');
      await conn.query("INSERT INTO users(username,email,mdp,points) VALUES (?,?,?,0) ", [username, email, digest]);
      console.log("user created");
    }finally {
      conn.release(); 
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/auth/login",async (req,res) => {
  try{
    let test=false;
    const {username, mdp} = req.body;
    const conn = await pool.getConnection();
    try{
      const hash = crypto.createHash('sha256').update(mdp).digest('hex');
      const [verif] = await conn.query("SELECT mdp FROM users WHERE username=?",[username]);
      console.log(verif.mdp);
      if(hash==verif.mdp){
        test=true;
      }
      res.send(test);
    } finally{
      conn.release();
    }
  }
  catch{
    res.status(500).send("Database error");
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
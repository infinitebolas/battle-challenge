import express, { json } from "express";
const app = express();
import { createPool } from 'mariadb';
import { createHash } from 'crypto';
import cors from 'cors';

app.use(cors({
  origin: '*',
  methods:["POST","GET"],
credentials: false
}));
app.use(json());


const pool = createPool({
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
      const rows = await conn.query("SELECT username, points FROM users ORDER BY points DESC LIMIT 10");
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
    return res.status(400).json({
      success: false,
      message: "Champs manquants"
    });
  }
  let conn;
  try {
    conn = await pool.getConnection();
    const hash = createHash('sha256').update(mdp).digest('hex');
    try {
      await conn.query(
        "INSERT INTO users(username,email,mdp,points) VALUES (?,?,?,0)",
        [username, email, hash]
      );
      console.log("User created:", username);
      return res.status(200).json({success: true, message: "Utilisateur créé"});
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: "User or email already exists"
        });
      }
      throw err;
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({success: false, message: "Database error"
    });
  } finally {
    if (conn) conn.release();
  }
});


app.post("/auth/login", async (req, res) => {
  try {
    const { username, mdp } = req.body;
    if (!username || !mdp) {
      return res.status(400).json({
        success: false,
        message: "Champs manquants"
      });
    }
    const conn = await pool.getConnection();
    try {
      const hash = createHash('sha256').update(mdp).digest('hex');
      const [rows] = await conn.query(
        "SELECT mdp FROM users WHERE username = ?",
        [username]
      );
      // Utilisateur inexistant
      if (rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Utilisateur non trouvé"
        });
      }
      const mdpStocke = rows.mdp;
      if (hash === mdpStocke) {
        return res.json({
          success: true,
          message: "Connexion réussie"
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Mot de passe incorrect"
        });
      }
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Database error"
    });
  }
});

app.post("/creation", async (req, res) => {
  try {
    const { titre, contenu, difficulte, points } = req.body;
    const conn = await pool.getConnection();
    try {
      await conn.query(
        "INSERT INTO challenge(titre, contenu, difficulte, points) VALUES (?,?,?,?)",
        [titre, contenu, difficulte, points]
      );
      res.status(200).json({success: true, message: "Défi créé"});
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Erreur base de données"
    });
  }
});

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
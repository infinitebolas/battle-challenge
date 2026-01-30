const express = require("express");
const app = express();
const mariadb = require('mariadb');
const crypto = require('crypto');
const cors = require('cors');

app.use(cors());
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
    const rows = await conn.query("INSERT INTO users(username,email,mdp,points) VALUES ('test','test@mail','123',45) ");
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
      const [rows] = await conn.query("SELECT username, points FROM users ORDER BY points DESC");
      res.json(rows);
    } finally {
      conn.release(); 
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/auth", async (req, res) => {
  try {
    const { username, email, mdp } = req.body;
    const conn = await pool.getConnection();
    try {
      const hash = crypto.createHash('sha256');
      hash.update(mdp);
      const digest = hash.digest('hex');
      const rows = await conn.query("INSERT INTO users(username,email,mdp,points) VALUES (?,?,?,0) ", [username, email, digest]);
      console.log("user created");
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur :", err);
      res.status(500).send("Erreur lors de la création de l'utilisateur");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});








app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
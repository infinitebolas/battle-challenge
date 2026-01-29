const express = require("express");
const app = express();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
host:'localhost',
user:'root',
password:'1Motdepasse',
database:'battlechallenge',
port:'3307'
  
});


async function initializeDatabase() {
  try {
    let conn = await pool.getConnection();
    const rows = await conn.query("INSERT INTO users(username,email,mdp,points) VALUES ('test','test@mail','123',45) ");
    console.log("Base de données initialisée");
  } catch (err) {
    console.error("Erreur lors de l'initialisation de la base de données :", err);
  }
}

initializeDatabase();

import express, { json } from "express";
const app = express();
import { createPool } from 'mariadb';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors({
  origin: '*',
  methods:["POST","GET"],
credentials: false
}));
app.use(json());

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Format attendu: "Bearer "
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: ' Accès refusé - Token manquant',
            hint: 'Ajoutez le header: Authorization: Bearer '
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            const message = err.name === 'TokenExpiredError' 

                ? ' Token expiré' 
                : ' Token invalide';
            
            return res.status(403).json({ 
                success: false,
                message,
                error: err.message
            });
        }
        
        req.user = decoded;
        next(); // Passer au handler suivant
    });
};
app.use("/creation",verifyToken);
app.use("/defis/submit",verifyToken);
app.use("/points",verifyToken);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


const pool = createPool({
host:process.env.HOST,
user:process.env.USER,
password:process.env.PASSWORD,
database:process.env.DATABASE,
port:process.env.PORT
});



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
    const hash = await bcrypt.hash(mdp, 10);;
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
      const [rows] = await conn.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      // Vérification utilisateur
      if (rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Utilisateur non trouvé"
        });
      }
      const user = rows;
      const passwordMatch = await bcrypt.compare(mdp, user.mdp);

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Mot de passe incorrect"
        });
      }

      // Création du token JWT
      const token = jwt.sign(
        {
          id: user.id_user,
          username: user.username
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      res.json({
        success: true,
        message: "Connexion réussie !",
        token,
        user: {
          id: user.id_user,
          username: user.username
        }
      });

    } finally {
      conn.release();
    }

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
});

app.post("/creation", async (req, res) => {
  try {
    const { titre, contenu, difficulte, points } = req.body;
    const conn = await pool.getConnection();
    try {
      conn.query(
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

app.get("/defis", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query("SELECT * FROM challenge");
      res.json(rows);
    } finally {
      conn.release(); 
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Database error");
  }
});

app.post("/defis/submit", async (req,res) => {
  try {
    const { contenu, usersub, challenge, points} = req.body;

    if (!contenu) {
      return res.status(400).json({
        success: false,
        message: "Contenu manquant"
      });
    }

    const conn = await pool.getConnection();

    try {
      const rows = await conn.query(
        "SELECT * FROM submissions WHERE user_sub = ? AND id_challenge = ? ",
        [usersub, challenge]
      );
      if (rows.length === 0) {
        await conn.query("INSERT INTO submissions (user_sub,sub,id_challenge) VALUES (?,?,?)",[usersub,contenu,challenge]);
        await conn.query("UPDATE users SET points = points + ? WHERE id_user=?", [points,usersub])
        return res.json({
          success: true,
          message: "Réponse enregistrée"
        });
      }
      else{
        return res.status(400).json({
          success: false,
          message: "Réponse déjà envoyée"
        });
      }

    } finally {
      conn.release();
    }

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
})

app.post("/points", async (req,res) => {
  try{
    const {id_user} = req.body;
    const conn = await pool.getConnection()
    try {
      const rows = await conn.query("SELECT points FROM users WHERE id_user = ?",[id_user]);
      if (rows){
        return res.json({
          success: true,
          value: rows[0].points
        });
      }
      else{
        return res.status(404).json({
          success: false,
          value:"Utilisateur non trouvé"
        })
      }
          
    } finally {
      conn.release(); 
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Database error");
  }
});


app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [message, setMessage] = useState({});
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameLogin, getUsername] = useState("");
    const [passwordLogin, getPassword] = useState("")
    const navigate = useNavigate()


async function register(event) {
    event.preventDefault();
    if (!username || !email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username:username, email:email, mdp: password }),
      });

 let data;
      try {
        data = await response.json();
      } catch {
        data = { success: false, message: "Réponse serveur invalide" };
      }

      if (response.ok) {
        alert(data.message || "Inscription réussie !");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Erreur lors de l'inscription.");
      }

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Impossible de se connecter au serveur. Vérifiez qu'il est démarré et que le CORS est configuré.");
    } 
  };

async function login(event) {
  event.preventDefault();

  if (!usernameLogin || !passwordLogin) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameLogin,
        mdp: passwordLogin
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Erreur d'authentification");
      return;
    }

    if (data.success) {
      // 🔐 ICI on récupère et stocke le token
      if (data.token) {
        localStorage.setItem("token", data.token);      
        alert('Authentification réussie');
        navigate('/');
      }
    } else {
      alert(data.message || 'Identifiants incorrects');
    }

  } catch (error) {
    console.error(error);
    alert('Erreur de connexion');
  }
}



  return (
    <div className="auth-page">
        <div className="login">
            <form onSubmit={login}>
                <input type="text" placeholder="Username" value={usernameLogin} onChange={(e) => getUsername(e.target.value)}/>
                <input type="password" placeholder="Password" value={passwordLogin} onChange={(e) => getPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            {/* <button onClick={()=>fetchMessage()}>Fetch Classement</button>
            <div>
                {JSON.stringify(message)}
            </div>
            */}
        </div>
        <div className="vl"></div>
        <div className="register">
            <form onSubmit={register}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
    );


}
export default Auth;
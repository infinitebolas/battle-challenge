import { useState } from 'react';
function Auth() {
    const [message, setMessage] = useState({});
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameLogin, getUsername] = useState("");
    const [passwordLogin, getPassword] = useState("")
async function register() {
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

    async function login() {
        if (!usernameLogin || !passwordLogin) { 
            alert("Veuillez remplir tous les champs."); 
            return;
        }
        try{
        await fetch('http://localhost:3000/auth/login',{
            method: 'POST', 
            headers: { 'Content-Type': 'application/json', }, 
            body: JSON.stringify({ username: usernameLogin,  mdp: passwordLogin }) 
        })
        .then(response => response.json())
        .then(data=>{
            if(data.success){
                alert('authentification réussie');
            }
            else{
                alert('mauvais mot de passe');
            }
        }) 
    }
        catch (error) {
            console.error(error)
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
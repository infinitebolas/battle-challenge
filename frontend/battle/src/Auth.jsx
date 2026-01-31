import { useState } from 'react';
function Auth() {
    const [message, setMessage] = useState({});
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameLogin, getUsername] = useState("");
    const [passwordLogin, getPassword] = useState("")

    async function fetchMessage() {
        try{
            const response = await fetch('http://localhost:3000/classement');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMessage(data);
        }
        catch(error){
            throw new Error("Erreur lors de la récupération des données :", error);
        }
    }
async function register() { 
    if (!username || !email || !password) { 
        alert("Veuillez remplir tous les champs."); 
        return; 
    } try{ 
        await fetch('http://localhost:3000/auth/register', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json', }, 
            body: JSON.stringify({ username: username, email: email, mdp: password }) 
        });
            alert("Inscription réussie !"); 
        } catch(error){ 
            alert("Le mail ou le nom d'utilisateur est déjà utilisé."); 
        } 
    }

    async function login() {
        if (!usernameLogin || !passwordLogin) { 
            alert("Veuillez remplir tous les champs."); 
            return;
        }
        try{
            const response = await fetch('http://localhost:3000/auth/login',{
                method: 'POST', 
                headers: { 'Content-Type': 'application/json', }, 
                body: JSON.stringify({ usernameLogin: username,  mdp: passwordLogin }) 
        });  

        const data = await response.json();
        console.log(data)
        }catch (error){
            alert("pas de connexion");
        };
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
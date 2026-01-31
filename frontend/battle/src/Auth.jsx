import { useState } from 'react';
function Auth() {
    const [message, setMessage] = useState({});

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
  return (
    <div className="auth-page">
        <div className="login">
            <form action="post">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <button onClick={()=>fetchMessage()}>Fetch Classement</button>
        </div>
        <div className="vl"></div>
        <div className="register">
            <form action="post">
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
  );
}
export default Auth;
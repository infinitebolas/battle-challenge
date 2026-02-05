import useToken from './token';
import parseJwt from './dechiffrement';
import { useState, useEffect } from "react";

function Accueil() {
  const token = useToken(state => state.token);
  const values = parseJwt(token);
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(null);
  const username = values?.username ;

useEffect(() => {
    async function fetchPoints() {
      try {
        const response = await fetch("http://localhost:3000/points", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id_user:values.id }),
      });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPoints(result.value);
      } catch (err) {
        setError(err.message);
        alert(error)
      }
    }
    fetchPoints();
  }, []);


  return (
    <div>
      <h1>Bienvenue sur la plateforme de bataille {username}</h1>
      {token && (
        <p>nombre de points : {points}</p>
      )}
      
    </div>
  );
}

export default Accueil;

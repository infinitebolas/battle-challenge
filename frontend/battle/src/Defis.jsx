import { useState, useEffect } from "react";
import useToken from './token';

function Defi() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const token =  useToken(state => state.token)
  useEffect(() => {
    async function fetchDefi() {
      
      try {
        const response = await fetch("http://localhost:3000/defis");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchDefi();
  }, []);

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (data.length === 0) {
    return <p>Aucun défi disponible.</p>;
  }

  return (
    <div>
      <h1>Liste des défis</h1>

      {data.map((defi) => (
        <div key={defi.id_challenge} style={{ border: "1px solid #000", margin: "10px", padding: "10px" }}>
          <h2>{defi.titre}</h2>
          <p>{defi.contenu}</p>
          <p><strong>Difficulté :</strong> {defi.difficulte}</p>
          <p><strong>Points :</strong> {defi.points}</p>
          {token && (
            <form action="">
              <textarea className="reponse" name="form_soumission" id={defi.id_challenge} placeholder="Entrez une réponse"></textarea>
              <button type="submit">Soumettre la réponse</button>
            </form>
          )}

        </div>
      ))}
    </div>
  );
}

export default Defi;

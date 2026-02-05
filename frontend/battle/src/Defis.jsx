import { useState, useEffect } from "react";
import useToken from './token';
import parseJwt from './dechiffrement'

function Defi() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [langage, setLangage] = useState("");
  const [responses, setResponses] = useState({});
  const token =  useToken(state => state.token);
  useEffect(() => {
    async function fetchDefi() {
      
      try {
        const response = await fetch("http://localhost:3000/defis");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchDefi();
  }, []);

  async function Reponse(event, id, points) {
    event.preventDefault()
    const contenu= responses[id]
    if (!contenu) {
      alert("Aucune réponse saisie.");
      return;
    }
    try {
    const response = await fetch('http://localhost:3000/defis/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        usersub: parseJwt(token).id,
        contenu: contenu,
        challenge: id,
        points: points
      })
    });

    const data = await response.json();

    if (data.success) {
      alert('Réponse enregistrée');
      setResponses(prev => {
        const updated = Object.assign({}, prev);
        updated[id] = "";
        return updated;
      });
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert('Erreur de connexion');
  }
}
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
            <form onSubmit={(e) => Reponse(e, defi.id_challenge, defi.points)}>
              <select name="langage" value={langage} onChange={(e) => setLangage(e.target.value)}>
    <option value="js">JavaScript</option>
  </select>
              <textarea
                className="reponse"
                placeholder="Entrez une réponse"
                value={responses[defi.id_challenge] || ""}
                onChange={(e) => {
                  const newResponses = Object.assign({}, responses);
                  newResponses[defi.id_challenge] = e.target.value;
                  setResponses(newResponses);
                }}
              />
              <button type="submit">Soumettre la réponse</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}

export default Defi;

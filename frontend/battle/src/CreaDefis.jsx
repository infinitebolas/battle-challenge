import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Creation() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const navigate = useNavigate()
  const resetForm = () => {
    setTitle("");
    setContent("");
    setDifficulty("EASY");
  };
  async function defi(event) {
    event.preventDefault()
    const token = localStorage.getItem("token");
    if (!title || !content) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      let points;

      switch (difficulty) {
        case "MEDIUM":
          points = 30;
          break;
        case "HARD":
          points = 50;
          break;
        default:
          points = 10;
      }
    console.log(token);
    const response = await fetch('http://localhost:3000/creation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        titre: title,
        contenu: content,
        difficulte: difficulty,
        points: points
      })
    });

    const data = await response.json();

    if (data.success) {
      alert('Défi enregistré');
      
      navigate('/defis');
    } else {
      alert("Erreur lors de l'enregistrement");
    }

  } catch (error) {
    console.error(error);
    alert('Erreur de connexion');
  }
}

  


  return (
    <div className="defi">
      <form onSubmit={defi}>
        <h3>Créer un défi</h3>
        <input type="text" placeholder="Titre du défi" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <p>Choisir la difficulté</p>
        <select name="difficulte" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </select>
        <p>Définissez l'énoncé</p>
        <textarea name="contenu" id="saisie" placeholder="Entrez votre défi" value={content} onChange={(e) => setContent(e.target.value)}/>
        <button type="button" onClick={resetForm}>
          Réinitialiser
        </button>
        <button className="publier" type="submit">Publier</button>
      </form>
    </div>
  );
}
export default Creation;
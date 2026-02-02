import { Link } from 'react-router-dom';
import { useState } from 'react';
function Creation() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");

  const resetForm = () => {
    setTitle("");
    setContent("");
    setDifficulty("EASY");
  };

  return (
    <div className="defi">
      <form>
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
        <Link to="/defis"><button className="publier" type="submit">Publier</button></Link>
      </form>
    </div>
  );
}
export default Creation;
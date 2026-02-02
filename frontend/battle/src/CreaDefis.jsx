import { Link } from 'react-router-dom';
import { useState } from 'react';
function Creation() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className='defi'>
      <form onSubmit={questionnaire}>
        <h3>Créer un défi</h3>
        <input type="text" placeholder="Titre du défi" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <p>Choisir la difficulté</p>
        <select name="difficulte">
            <option>EASY </option>
            <option>MEDIUM</option>
            <option>HARD</option>
        </select>
        <p>Définissez l'énoncé</p>
        <textarea name="contenu" id="saisie" placeholder="Entrez votre défi" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button className="publier" type="submit">Publier</button>
      </form>
    </div>
  );
}
export default Creation;
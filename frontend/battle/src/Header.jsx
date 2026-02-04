import { Link } from 'react-router-dom';
import { useState } from 'react';
function Header() {
  const [token, getToken] = useState(localStorage.getItem("token"));
    let connexion;    
    const logout = () => {
    localStorage.removeItem("token");
    alert("Déconnexion réussie");
    navigate("/login");
  }
    if (!token){
      connexion = <Link to='/auth'>Connexion</Link>
    }
    else{
      connexion=<button onClick={logout}>Se déconnecter</button>
    }

  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to='/'>Accueil</Link></li>
            <li><Link to='/classement'>Classement</Link></li>
            <li><Link to='/defis'>Défis</Link></li>
            <li><Link to='/creation'>Création des défis</Link></li>
            <li>{connexion}</li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
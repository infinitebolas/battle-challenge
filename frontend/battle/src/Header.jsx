import { Link } from 'react-router-dom';
import useToken from './token';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  const token = useToken(state => state.token);
  const clearToken = useToken((state) => state.clearToken);
    let connexion;    
    const logout = () => {
    clearToken();
    alert("Déconnexion réussie");
    navigate("/auth");
  
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
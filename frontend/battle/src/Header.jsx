import { Link } from 'react-router-dom';
function Header() {
  return (
    <header className="header">
      <h3><Link to='/'>Battle Challenge</Link></h3>
      <nav>
        <ul>
          <li><Link to='/'>Accueil</Link></li>
            <li><Link to='/classement'>Classement</Link></li>
            <li><Link to='/defis'>Défis</Link></li>
            <li><Link to='/creation-defi'>Création des défis</Link></li>
            <li><Link to='/auth'>Connexion</Link></li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
function Header() {
  return (
    <header className="header">
      <h1>Battle Challenge</h1>
      <nav>
        <ul>
            <li><a href="classement">Classement</a></li>
            <li><a href="defis">Défis</a></li>
            <li><a href="creation-defi">Création des défis</a></li>
            <li><a href="deconnexion">Déconnexion</a></li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
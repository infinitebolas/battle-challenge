import useToken from './token';

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload); // décoder base64
    return JSON.parse(payload);
  } catch (e) {
    console.error("Erreur decode JWT", e);
    return null;
  }
}

function Accueil() {
  const token = useToken(state => state.token);
  const payload = parseJwt(token);
  const username = payload?.username || "ACCUEIL";

  return (
    <div>
      <h1>Bienvenue sur la plateforme de bataille, {username}</h1>
    </div>
  );
}

export default Accueil;

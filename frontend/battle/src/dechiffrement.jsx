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
export default parseJwt;
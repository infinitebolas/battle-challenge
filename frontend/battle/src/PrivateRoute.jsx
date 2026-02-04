import { Navigate } from 'react-router-dom';
import useToken from './token';

export default function PrivateRoute({ children }) {
  const token = useToken(state => state.token);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // Sinon on affiche l'enfant
  return children;
}

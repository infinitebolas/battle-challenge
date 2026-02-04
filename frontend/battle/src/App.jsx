import Header from './Header.jsx';
import Auth from './Auth.jsx';
import Classement from './Classement.jsx';
import Accueil from './Accueil.jsx';
import Defis from './Defis.jsx';
import CreaDefis from './CreaDefis.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Route wildcard → redirection vers l'accueil */}
        <Route path='*' element={<Navigate to='/' replace />} />

        {/* Routes publiques */}
        <Route path='/' element={<Accueil />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/classement' element={<Classement />} />

        {/* Routes protégées */}
        <Route
          path='/defis'
          element={
            <PrivateRoute>
              <Defis />
            </PrivateRoute>
          }
        />
        <Route
          path='/creation'
          element={
            <PrivateRoute>
              <CreaDefis />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

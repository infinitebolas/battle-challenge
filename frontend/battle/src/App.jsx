import Header from './Header.jsx';
import Auth from './Auth.jsx';
import Classement from './Classement.jsx';
import Accueil from './Accueil.jsx';
import Defis from './Defis.jsx';
import CreaDefis from './CreaDefis.jsx';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>    
        <Route path='*' element={<Navigate to='/'/>}></Route>

        <Route path='/' element={<Accueil/>}></Route>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/classement' element={<Classement/>}></Route>
        <Route path='/defis' element={<Defis/>}></Route>
        <Route path='/creation-defi' element={<CreaDefis/>}></Route>
      </Routes>
    </BrowserRouter>
  )
  }



export default App

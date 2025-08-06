import { Routes, Route } from 'react-router-dom';
import { PageNotFound } from './components/NotFound';
import { AuthorizationForm } from './components/Form/AuthorizationForm.jsx';
import { RegistrationForm } from './components/Form/RegistrationForm.jsx';
import { HomePage } from './components/HomePage/HomePage.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';


function App() {
  return (
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }/>
          <Route path='/login' element={<AuthorizationForm />}/>
          <Route path='/signup' element={<RegistrationForm />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
  );
}

export default App;

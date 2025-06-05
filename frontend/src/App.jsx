import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageNotFound } from './components/NotFound';
import { AuthorizationForm } from './components/Form/AuthorizationForm.jsx';
import { HomePage } from './components/HomePage/HomePage.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { AuthProvider } from './components/Slices/AuthSlice.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }/>
          <Route path='/login' element={<AuthorizationForm />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

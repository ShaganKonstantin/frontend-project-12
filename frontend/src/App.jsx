import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageNotFound } from './components/NotFound';
import { AuthorizationForm } from './components/Form/AuthorizationForm.jsx';
import { HomePage } from './components/HomePage/HomePage.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }></Route>
        <Route path='login' element={<AuthorizationForm />}/>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

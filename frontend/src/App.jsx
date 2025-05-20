import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageNotFound } from './components/NotFound';
import { AuthorizationForm } from './components/Form/AuthorizationForm.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageNotFound />} />
        <Route path='login' element={<AuthorizationForm />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

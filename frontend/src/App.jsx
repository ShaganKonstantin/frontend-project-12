import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageNotFound } from './components/NotFound';
import { AuthorizationForm } from './components/Form/AuthorizationForm.jsx';
import { HomePage } from './components/HomePage/HomePage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='login' element={<AuthorizationForm />}/>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

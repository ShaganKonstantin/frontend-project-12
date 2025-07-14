import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './components/Store/chatStore.jsx';
import { SocketProvider } from './components/Providers/SocketProvider.jsx';
import { AuthProvider } from './components/Providers/AuthProvider.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
)

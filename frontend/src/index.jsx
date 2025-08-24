import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './components/Store/chatStore.jsx'
import { SocketProvider } from './components/Providers/SocketProvider.jsx'
import { AuthProvider } from './components/Providers/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './utils/i18n/i18n.jsx'
import { ToastContainer } from 'react-toastify'
import { rollbarConfig } from './utils/Rollbar/rollbarConfig.js'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

createRoot(document.getElementById('root')).render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <SocketProvider>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <App />
              </SocketProvider>
            </AuthProvider>
          </Provider>
        </I18nextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </RollbarProvider>,
)

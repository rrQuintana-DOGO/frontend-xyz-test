import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PrimeReactProvider } from 'primereact/api';
import { store } from './redux/store.ts'
import App from './App.tsx'
import './index.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="247989697827-kikfl07h3hg68gbmog728mr9fp97m3qi.apps.googleusercontent.com">
        <PrimeReactProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </PrimeReactProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
)

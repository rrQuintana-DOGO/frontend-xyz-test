import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './logic/redux/store.ts'
import App from './App.tsx'
import './index.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { envs } from './config/envs.ts';
import { ThemeProvider } from '@mui/material';
import { theme } from './config/MuiTheme.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={envs.googleClientId}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <App />
            </LocalizationProvider>
          </ThemeProvider>
        </Provider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
)

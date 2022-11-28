import { CssBaseline } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Layout from './components/Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfirmProvider>
      <CssBaseline />
      <Layout>
        <App />
      </Layout>
    </ConfirmProvider>
  </React.StrictMode>
);

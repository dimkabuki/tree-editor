import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { RecoilRoot } from 'recoil';
import theme from './theme';
import { App } from './components/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ThemeProvider>
);

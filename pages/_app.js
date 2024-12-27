import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    );
}

export default MyApp;
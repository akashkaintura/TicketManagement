import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '../app/components/Layout/MainLayout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            </ThemeProvider>
        </SessionProvider>
    );
}

export default MyApp;
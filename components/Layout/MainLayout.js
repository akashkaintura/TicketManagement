import { Box } from '@mui/material';
import Head from 'next/head';

export default function MainLayout({ children }) {
    return (
        <>
            <Head>
                <title>Ticket Management System</title>
            </Head>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}>
                <main style={{ flexGrow: 1 }}>
                    {children}
                </main>
            </Box>
        </>
    );
}
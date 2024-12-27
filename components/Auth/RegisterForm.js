import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error('Failed to register');
            }

            const data = await res.json();
            alert('Registration successful');
            router.push('/login');
        } catch (error) {
            alert(error.message);
        }
    };

    if (session) {
        router.push('/dashboard');
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
}
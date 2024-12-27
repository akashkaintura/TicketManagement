import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@mui/material';

export default function UserProfile() {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {user.name}
                </Typography>
                <Typography variant="body2">
                    Email: {user.email}
                </Typography>
            </CardContent>
        </Card>
    );
}
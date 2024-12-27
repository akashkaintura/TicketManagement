import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@mui/material';

export default function TicketDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`/api/tickets/${id}`);
                const data = await response.json();
                setTicket(data);
            } catch (error) {
                console.error('Error fetching ticket:', error);
            }
        };

        if (id) {
            fetchTicket();
        }
    }, [id]);

    if (!ticket) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {ticket.title}
                </Typography>
                {/* ... (display other ticket details) */}
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {ticket.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Status: {ticket.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Priority: {ticket.priority}
                </Typography>
            </CardContent>
            <CardContent>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => router.push('/dashboard')}>
                    Back
                </Button>
            </CardActions>
        </Card>
    );
}
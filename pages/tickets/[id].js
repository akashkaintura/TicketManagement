import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography
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
                <Typography variant="body2">
                    Description: {ticket.description}
                </Typography>
                <Typography variant="body2">
                    Status: {ticket.status}
                </Typography>
                <Typography variant="body2">
                    Priority: {ticket.priority}
                </Typography>
                {/* Add more details as needed */}
            </CardContent>
        </Card>
    );
}
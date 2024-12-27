import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Stack,
    Typography
} from '@mui/material';
import TicketCard from './TicketCard';

export default function TicketList() {
    const { data: session } = useSession();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('/api/tickets');
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        if (session) {
            fetchTickets();
        }
    }, [session]);

    return (
        <Stack spacing={2}>
            {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </Stack>
    );
}
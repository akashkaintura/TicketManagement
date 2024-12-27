import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Stack,
    Typography,
    TextField,
    Pagination
} from '@mui/material';
import TicketCard from './TicketCard';

export default function TicketList() {
    const { data: session } = useSession();
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ticketsPerPage] = useState(10);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('/api/tickets');
                const data = await response.json();
                setTickets(data);
                setTotalPages(Math.ceil(data.length / ticketsPerPage));
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        if (session) {
            fetchTickets();
        }
    }, [session]);

    const filteredTickets = tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedTickets = filteredTickets.slice(
        (page - 1) * ticketsPerPage,
        page * ticketsPerPage
    );

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Stack spacing={2}>
            <TextField
                label="Search Tickets"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
            />
            {paginatedTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
            />
        </Stack>
    );
}
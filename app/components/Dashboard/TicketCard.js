import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@mui/material';

import { useRouter } from 'next/router';

export default function TicketCard({ ticket }) {
    const router = useRouter();
    const handleTicketClick = () => {
        router.push(`/tickets/${ticket.id}`);
    };
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {ticket.title}
                </Typography>
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
            <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
                <Button size="small" color="error">Delete</Button>
            </CardActions>
        </Card>
    );
}
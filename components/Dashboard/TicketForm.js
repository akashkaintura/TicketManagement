import { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

export default function TicketForm() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Open');
    const [priority, setPriority] = useState('Low');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, status, priority }),
            });

            if (response.ok) {
                alert('Ticket created successfully');
                router.push('/dashboard');
            } else {
                throw new Error('Failed to create ticket');
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                    labelId="priority-select-label"
                    id="priority-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Urgent">Urgent</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
}
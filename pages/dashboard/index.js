import { useSession } from 'next-auth/react';
import TicketList from '../../../components/Dashboard/TicketList';
import TicketForm from '../../../components/Dashboard/TicketForm';

export default function DashboardPage() {
    const { data: session } = useSession();

    if (!session) {
        return <div>Please log in.</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <TicketForm />
            <TicketList />
        </div>
    );
}
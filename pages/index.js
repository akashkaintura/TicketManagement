import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function HomePage() {
    const { data: session } = useSession();
    const router = useRouter();

    if (session) {
        router.push('/dashboard');
    }

    return (
        <div>
            <h1>Welcome to the Ticket Management System</h1>
            <p>Please login to access your tickets.</p>
        </div>
    );
}
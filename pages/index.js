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
            {/* Home page content (optional) */}
        </div>
    );
}
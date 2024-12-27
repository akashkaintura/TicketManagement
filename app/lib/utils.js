import { getSession } from 'next-auth/react';

export async function getUserFromSession(req) {
    const session = await getSession({ req });
    return session?.user;
}
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const user = await getUserFromSession(req);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const tickets = await prisma.ticket.findMany({
            where: { userId: user.id },
        });
        res.status(200).json(tickets);
    } else if (req.method === 'POST') {
        const { title, description, status, priority } = req.body;
        const user = await getUserFromSession(req);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const newTicket = await prisma.ticket.create({
            data: {
                title,
                description,
                status,
                priority,
                user: { connect: { id: user.id } },
            },
        });

        res.status(201).json(newTicket);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);

    }
}
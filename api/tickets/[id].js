import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const ticket = await prisma.ticket.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(ticket);
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { title, description, status, priority } = req.body;
        const user = await getUserFromSession(req);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updatedTicket = await prisma.ticket.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                status,
                priority,
            },
        });

        res.status(200).json(updatedTicket);

    } else if (req.method === 'DELETE') {
        if (req.method === 'DELETE') {
            const { id } = req.query;
            const user = await getUserFromSession(req);

            if (!user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            await prisma.ticket.delete({
                where: { id: Number(id) },
            });

            res.status(204).end();
        }
    }
}
import { prisma } from '../../lib/db';
import { getUserFromSession } from '../../lib/utils';

export default async function handler(
  req,
  res
) {
  if (req.method === 'GET') {
    const user = await getUserFromSession(req);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
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
  }
}
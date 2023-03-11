// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client';

type Data = {
  email: string;
  password: string;
  role: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Save new user to mongoDB
  if (req.method === 'POST') {
    const { email, password, role } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });
    const users = await prisma.user.findMany();

    res.json(newUser);
  }
}

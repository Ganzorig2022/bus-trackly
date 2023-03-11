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
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { text, parent } = req.body;
    const newDriver = await prisma.driver.create({
      // data: {
      //   email: 'alice@prisma.io',
      //   password: '99022052',
      // },
    });

    // const posts = await PrismaClientConnect.driver.findMany({
    //   where: {
    //     published: true,
    //   },
    // });
    res.json(newDriver);
  }
}

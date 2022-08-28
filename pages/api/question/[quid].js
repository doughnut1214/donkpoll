import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
    const { quid } = req.query
    let input = parseInt(quid);
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const prisma = new PrismaClient()

    const question = await prisma.Question.findUnique({
        where: {
            id: input,
        },
    })
    console.log(question)
    res.status(200).json(question)
}
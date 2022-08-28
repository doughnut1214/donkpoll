import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
    const { questionId } = req.query
    let input = parseInt(questionId);
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }
    const prisma = new PrismaClient()

    const options = await prisma.Option.findMany({
        where: {
            questionId: input,
        },
    })
    console.log(options)
    res.status(200).json(options)
}
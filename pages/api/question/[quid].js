import prisma from '../../../prisma/prismaClient';

export default async function handler(req, res) {
    const { quid } = req.query
    let input = parseInt(quid);
    if (req.method == 'GET') {
        const question = await prisma.Question.findUnique({
            where: {
                id: input,
            },
        })
        console.log(question)
        if(!question){
            res.status(404).json("No question found")
            return 
        }
        res.status(200).json(question)
        
    }

    if (req.method == 'PUT')
    {
        console.log("Update Question here! ")
        res.status(200).json("Update Here")
    }

    if (req.method == 'DELETE'){
        console.log("Delete question here")
        res.status(200).json("Test Delete")
    }

}
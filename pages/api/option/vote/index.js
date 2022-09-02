import prisma from '../../../../prisma/prismaClient'
export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    
    
    console.log("Data,", req.body)
    const body = JSON.parse(req.body)
    const input = parseInt(body.id)
    console.log("Increment likes of option id: ", body.id)
    const updatedVote = await prisma.option.update({
        where: {
            id: input,
        },
        data: {
            likes: {
                increment: 1,
            },

        },




    })
    


    console.log("Post here to make a vote!")
    res.status(200).json("Vote Succesful")
}
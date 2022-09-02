import prisma from "../../../prisma/prismaClient"
export default async function handler(req, res) {
  if (req.method == 'POST') {
    console.log(req.body)
    console.log("POST question logic here")

    const newQuestion = await prisma.question.create({
      data:{
        prompt: req.body
      }
    })
    res.status(200).json(newQuestion)

  }

}



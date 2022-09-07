import prisma from "../../../prisma/prismaClient";


export default async function handler(req, res) {
    const { questionId } = req.query
    if(questionId === undefined){
        res.status(405).json("No input found")
        return
    }
    let input = parseInt(questionId);
    if (req.method == 'GET') {
        const options = await prisma.Option.findMany({
            where: {
                questionId: input,
            },
        })
    
        if(!options){
            res.status(404).json("No options found.")
        }
        console.log(options)
        res.status(200).json(options)
        
    }

    if (req.method == 'POST'){
        console.log(req.body)
        const body = JSON.parse(req.body)
        console.log("Option bodies: ", body)
        console.log("Access attempt: ", body[0].option)
        body.forEach(async function(field) {
            let newOption = await prisma.option.create({
                data:{
                    title: field.option,
                   
                    question: { connect: { id: input } }
                }
            })
        });
        

        res.status(200).json("test option creations")

    }

}
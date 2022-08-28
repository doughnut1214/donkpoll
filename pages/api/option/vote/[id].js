export default function handler(req, res) {
    const { id } = req.query
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    console.log("Post here to make a vote!")
    console.log("Increment likes of option id: ", id)
    res.status(200).json(id)
}
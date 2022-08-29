export default function handler(req, res) {
    console.log("Create a Question here!")
    console.log(req.body)
    res.status(200).json({ name: 'John Doe' })
  }

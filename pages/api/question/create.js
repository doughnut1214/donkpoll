export default function handler(req, res) {
    console.log("Create a Question here!")
    res.status(200).json({ name: 'John Doe' })
  }

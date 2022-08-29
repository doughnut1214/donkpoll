import { useState } from "react"


const QuestionForm = () => {
    const [inputFields, setInputFields] = useState([
        { option: '' },
        { option: '' }
    ])
    const [question, SetQuestion] = useState('')

    /* 
        Functions called on buttons below, state variables above 
    */
    const AddInput = (e) => {
        e.preventDefault()
        let newfield = { option: '' }

        setInputFields([...inputFields, newfield])
    }
    const RemoveInput = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)

    }
    const HandleSubmit = (e) => {
        e.preventDefault()
        console.log("Form Submitted " + question)
        console.log(inputFields)
        fetch("/api/question/create", {
            method: 'POST',
            body: JSON.stringify(question)
        })
    }
    const HandleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    return (
        <form onSubmit={HandleSubmit}>
            <label htmlFor="question">Question:</label>
            <input type="text" name="question" placeholder="Your Question" onChange={(e) => {
                SetQuestion(e.target.value)
            }} required />
            {inputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <input
                            name='option'
                            placeholder='Option'
                            value={input.option}
                            onChange={(e) => { HandleFormChange(index, e) }}
                            required
                        />
                        {//Every poll MUST have atleast 2 options, only remove inputs beyond 2 
                            index > 1 ?
                                <button onClick={() => { RemoveInput(index) }}>Remove</button>
                                :
                                <></>

                        }
                    </div>
                )
            })}
            <button onClick={AddInput}>Add Options!</button>
            <button type="submit">Create Quesiton!</button>
        </form>

    )
}
export default QuestionForm
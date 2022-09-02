import { useState } from "react"
import Link from "next/link"

const QuestionForm = () => {
    const [inputFields, setInputFields] = useState([
        { option: '' },
        { option: '' }
    ])
    const [question, SetQuestion] = useState('')
    const [questionLink, SetQuestionLink] = useState('')
    const [questionLinkIsHidden, SetQuestionLinkIsHidden] = useState(true)
    const [submitButtonDisabled, SetSubmitButtonDisabled] = useState(false)
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
        fetch("/api/question/", {
            method: 'POST',
            body: question
        }).then(data => data.json())
            .then(data => {
                console.log(data)
                SetSubmitButtonDisabled(true)
                SetQuestionLink(data.id)
                SetQuestionLinkIsHidden(false)
                fetch("/api/option/" + data.id, {
                    method: 'POST',
                    body: JSON.stringify(inputFields)
                })
            })
    }
    const HandleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    return (
        <>
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
                <button onClick={AddInput} disabled={submitButtonDisabled}>Add Options!</button>
                <button type="submit" disabled={submitButtonDisabled}>Create Quesiton!</button>
            </form>
            {questionLinkIsHidden ? <></>
                :

                <button>
                   <Link href={`/question/${questionLink}`}>Show my Question!</Link>
                </button>

            }
        </>
    )
}
export default QuestionForm
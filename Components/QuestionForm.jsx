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
        //refactor this, there's a better way to post relational data
        //see https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-single-record-and-multiple-related-records
        fetch("/api/question/", {
            method: 'POST',
            body: question
        }).then(data => data.json())
            .then(data => {
                console.log(data)
                //Take the data, set the link, show the link, disable form buttons, then post the options (refactor)
                SetSubmitButtonDisabled(true)
                SetQuestionLink(data.id)
                fetch("/api/option/" + data.id, {
                    method: 'POST',
                    body: JSON.stringify(inputFields)
                })
                .then(()=>{
                    //only shows the link button if the options have been inserted 
                    SetQuestionLinkIsHidden(false)

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
            <form onSubmit={HandleSubmit} className="mt-3 justify-items-center flex flex-col" >
                <label htmlFor="question" className=" text-center">Question:</label>
                <input type="text" name="question" placeholder="Your Question" className="mb-2 border border-slate-500 active:border-slate-400 p-3 rounded-lg" onChange={(e) => {
                    SetQuestion(e.target.value)
                }} required />
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <input
                                name='option'
                                placeholder='Option'
                                value={input.option}
                                className=" border border-slate-500 active:border-slate-400 p-3 rounded-lg"
                                onChange={(e) => { HandleFormChange(index, e) }}
                                required
                            />
                            {//Every poll MUST have atleast 2 options, only remove inputs beyond 2 
                                index > 1 ?
                                    <button className=" bg-slate-500 hover:bg-slate-400  disabled:bg-slate-300 text-white rounded-lg p-3 lg:w-auto w-full" onClick={() => { RemoveInput(index) }}>Remove</button>
                                    :
                                    <></>

                            }
                        </div>
                    )
                })}
                <button onClick={AddInput} disabled={submitButtonDisabled} className=" bg-slate-500 hover:bg-slate-400  disabled:bg-slate-300 text-white rounded-lg p-3 m-1">Add Options!</button>
                <button type="submit" className=" bg-slate-500 hover:bg-slate-400 disabled:bg-slate-300 text-white rounded-lg p-3 m-1"disabled={submitButtonDisabled}>Create Quesiton!</button>
            </form>
            {questionLinkIsHidden ? <></>
                :

                <button className=" bg-slate-500 hover:bg-slate-400 text-white rounded-lg p-3 m-1 animate-bounce mt-3">
                   <Link href={`/question/${questionLink}`}>Show my Question!</Link>
                </button>

            }
        </>
    )
}
export default QuestionForm
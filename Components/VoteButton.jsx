import styles from '../styles/Home.module.css'
const VoteButton = (props) => {

    return (
        <div className="w-4/5 lg:w-1/2  border items-center p-1 pb-0 ml-auto mr-auto mt-2 rounded-lg">
            <h1 className="text-center">{props.likes}</h1>
            <button key={props.id} className="w-full bg-slate-500 hover:bg-slate-400 disabled:bg-slate-300 text-white rounded-lg p-3" value={props.value} onClick = {props.clickInstruction} disabled={props.disabled}><h1>{props.prompt}</h1></button>

        </div>



    )

}
export default VoteButton
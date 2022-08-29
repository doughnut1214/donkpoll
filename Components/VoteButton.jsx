import styles from '../styles/Home.module.css'
const VoteButton = (props) => {

    return (
        <div className={styles.card}>
            <h1>{props.likes}</h1>
            <button key={props.id} value={props.value} onClick = {props.clickInstruction} disabled={props.disabled}><h1>{props.prompt}</h1></button>

        </div>



    )

}
export default VoteButton
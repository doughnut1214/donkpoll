import styles from '../styles/Home.module.css'
const VoteButton = (props) => {

    return (
        <div className={styles.card}>
            <button value={props.value} onClick = {props.clickInstruction} disabled={props.disabled}>{props.prompt}</button>

        </div>



    )

}
export default VoteButton
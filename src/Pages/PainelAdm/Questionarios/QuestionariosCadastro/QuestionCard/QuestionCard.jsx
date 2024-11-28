
import styles from './QuestionCard.module.css'
import trash from "../../../../../assets/icons/trash2.svg";
import pen from "../../../../../assets/icons/pen.svg";
import TrashIcon from '../../../../../assets/svgFlies/TrashIcon';
import PenIcon from '../../../../../assets/svgFlies/PenIcon';

const QuestionCard = ({text}) => {
  return (
    <div className={styles.container}>
        <h3>{text}</h3>
        <TrashIcon color={"#FFFFFF"} size={"30px"} />
        <PenIcon color={"#FFFFFF"} size={"30px"} />
        
    </div>
  )
}

export default QuestionCard
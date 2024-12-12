
import styles from './QuestionCard.module.css'
import trash from "../../../../../assets/icons/trash2.svg";
import pen from "../../../../../assets/icons/pen.svg";
import TrashIcon from '../../../../../assets/svgFlies/TrashIcon';
import PenIcon from '../../../../../assets/svgFlies/PenIcon';
import { useContext } from 'react';
import { GlobalContext } from '../../../../../Hooks/GlobalContext';

const QuestionCard = ({question,handleCardDelete,index}) => {
  const { setModal,setDataUpdate } = useContext(GlobalContext);

  
  function handleUpdateClick(){
    setModal("show-QuestionConfig")
    setDataUpdate(question)
    
  }

  return (
    <div className={styles.container}>
        <h3>{question.titulo}</h3>
        <TrashIcon onclick={()=>handleCardDelete(index)} color={"#FFFFFF"} size={"30px"} />
        <PenIcon onclick={handleUpdateClick} color={"#FFFFFF"} size={"30px"} />
    </div>
  )
}

export default QuestionCard
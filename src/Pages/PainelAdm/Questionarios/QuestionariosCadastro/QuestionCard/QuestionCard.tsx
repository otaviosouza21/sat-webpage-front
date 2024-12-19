
import styles from './QuestionCard.module.css'
import TrashIcon from '../../../../../assets/svgFlies/TrashIcon';
import PenIcon from '../../../../../assets/svgFlies/PenIcon';
import { useGlobalContext } from '../../../../../Hooks/GlobalContext.tsx';
import { questionListProps } from '../QuestionariosCadastro';
import { PerguntasProps } from '../../../../../types/apiTypes.ts';


interface QuestionCardProps{
  index: number;
  handleCardDelete: (index:number)=> void;
  question: PerguntasProps
}

const QuestionCard = ({question,handleCardDelete,index}:QuestionCardProps) => {
  const { setModal,setDataUpdate } = useGlobalContext();

  
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
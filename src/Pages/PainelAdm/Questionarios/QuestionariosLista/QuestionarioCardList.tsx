import React from "react";
import styles from "./QuestionarioLista.module.css";
import { convertData } from "../../../../plugins/convertData";
import TrashIcon from "../../../../assets/svgFlies/TrashIcon.tsx";
import PenIcon from "../../../../assets/svgFlies/PenIcon.tsx";
import { Form } from "./QuestionariosLista.tsx";

type CardListProps = React.ComponentProps<'li'>&{
  form: Form;
  handleDelete: (id:number) => void;
  handleEdit: (form: Form) => void;
}

const QuestionarioCardList = ({ form ,handleDelete,handleEdit }:CardListProps) => {
  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <h4>{form.titulo}</h4>
        <span style={form.status ? { color: "green" } : { color: "tomato" }}>
          {form.status ? "Ativo" : "Inativo"}
        </span>
      </div>
      <p>{form.descricao}</p>
      <div className={styles.data}>
        <span>Inicio: {convertData(form.vigencia_inicio)}</span>
        <span>Fim: {convertData(form.vigencia_fim)}</span>
      </div>
      <div className={styles.icons}>
        <TrashIcon
          onclick={() => handleDelete(form.id)}
          color={"green"}
          size="30px"
        />
        <PenIcon onclick={() => handleEdit(form)} color={"green"} size="30px" />
      </div>
    </li>
  );
};

export default QuestionarioCardList;

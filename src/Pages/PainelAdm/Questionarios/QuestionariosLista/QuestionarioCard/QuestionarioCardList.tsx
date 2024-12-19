import React, { useEffect } from "react";
import styles from "../QuestionarioLista.module.css";
import { convertData } from "../../../../../plugins/convertData.ts";
import TrashIcon from "../../../../../assets/svgFlies/TrashIcon.tsx";
import PenIcon from "../../../../../assets/svgFlies/PenIcon.tsx";
import { Form } from "../QuestionariosLista.tsx";
import { QuestionarioCompletoProps, QuestionarioProps } from "../../../../../types/apiTypes.ts";

type CardListProps = React.ComponentProps<"li"> & {
  form: QuestionarioCompletoProps;
  handleDelete: (id: number) => void;
  handleEdit: (form: QuestionarioProps) => void;
};

const QuestionarioCardList = ({
  form,
  handleDelete,
  handleEdit,
}: CardListProps) => {
  if (form && form.Tipos_formulario)
    return (
      <li className={styles.card}>
        <div className={styles.header}>
          <h4>{form.titulo}</h4>
          <span style={form.status ? { color: "green" } : { color: "tomato" }}>
            {form.status ? "Ativo" : "Inativo"}
          </span>
        </div>
        <p className={styles.tipo}>
          <span>Tipo:</span> {form.Tipos_formulario.nome}
        </p>
        <div className={styles.data}>
          <span>Inicio: {convertData(form.vigencia_inicio)}</span>
          <span>Fim: {convertData(form.vigencia_fim)}</span>
        </div>
        <div className={styles.icons}>
          <TrashIcon
            onclick={() => handleDelete(Number(form.id))}
            color={"green"}
            size="30px"
          />
         {/*  <PenIcon
            onclick={() => handleEdit(form)}
            color={"green"}
            size="30px"
          /> */}
        </div>
      </li>
    );
};

export default QuestionarioCardList;

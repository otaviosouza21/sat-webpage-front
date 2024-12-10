import React from "react";
import styles from './QuestionarioForm.module.css'
import InputText from "../../../../../Components/Forms/Input/InputText";
import InputSelect from "../../../../../Components/Forms/Input/InputSelect";

const QuestionarioForm = ({
  formRef,
  tituloForm,
  vigenciaInicioForm,
  vigenciaFimForm,
  descricaoForm,
  tipoForm,
}) => {
  return (
    <form ref={formRef} className={styles.form}>
      <InputText {...tituloForm} label="Titulo" gridColumn="1/3" />
      <InputText
        {...vigenciaInicioForm}
        type="date"
        label="Vigencia Inicio"
        gridColumn="3"
      />
      <div>
        <InputText
          {...vigenciaFimForm}
          type="date"
          label="Vigencia Fim"
          gridColumn="4"
        />
      </div>
      <InputText {...descricaoForm} label="Descrição" gridColumn="1/5" />
      <InputText {...tipoForm} label="Tipo" gridColumn="1/4" />
      <InputSelect
        label="Status"
        id="status"
        options={[
          { id: 1, nome: "Ativo" },
          { id: 2, nome: "Inativo" },
        ]}
        gridColumn="2"
      />
    </form>
  );
};

export default QuestionarioForm;

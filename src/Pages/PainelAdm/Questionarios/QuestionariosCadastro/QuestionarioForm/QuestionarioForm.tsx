import React from "react";
import styles from "./QuestionarioForm.module.css";
import InputText from "../../../../../Components/Forms/Input/InputText.tsx";
import InputSelect from "../../../../../Components/Forms/Input/InputSelect.tsx";
import { useFormProps } from "../../../../../Hooks/useForm";

type questionarioFormProps = React.ComponentProps<"form"> & {
  formRef: React.RefObject<HTMLFormElement>;
  tituloForm: useFormProps;
  vigenciaInicioForm: useFormProps;
  vigenciaFimForm: useFormProps;
  descricaoForm: useFormProps;
  tipoForm: useFormProps;
};

const QuestionarioForm = ({
  formRef,
  tituloForm,
  vigenciaInicioForm,
  vigenciaFimForm,
  descricaoForm,
  tipoForm,
}: questionarioFormProps) => {
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

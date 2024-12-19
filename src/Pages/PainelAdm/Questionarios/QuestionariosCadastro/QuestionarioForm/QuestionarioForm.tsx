import React from "react";
import styles from "./QuestionarioForm.module.css";
import InputText from "../../../../../Components/Formularios/Forms/Input/InputText.tsx";
import InputSelect from "../../../../../Components/Formularios/Forms/Input/InputSelect.tsx";
import { useFormProps } from "../../../../../Hooks/useForm";
import { tipoFormularioProps } from "../../../../../types/apiTypes.ts";

type questionarioFormProps = React.ComponentProps<"form"> & {
  formRef: React.RefObject<HTMLFormElement>;
  tituloForm: useFormProps;
  vigenciaInicioForm: useFormProps;
  vigenciaFimForm: useFormProps;
  descricaoForm: useFormProps;
  tipoForm: tipoFormularioProps[] | null;
  setCurrentTipoForm: React.Dispatch<React.SetStateAction<string>>;
  currentTipoForm: string;
  setStatusForm: React.Dispatch<React.SetStateAction<string>>;
  statusForm: string
};

const QuestionarioForm = ({
  formRef,
  tituloForm,
  vigenciaInicioForm,
  vigenciaFimForm,
  descricaoForm,
  tipoForm,
  setCurrentTipoForm,
  currentTipoForm,
  setStatusForm,
  statusForm
}: questionarioFormProps) => {
  if (tipoForm && tipoForm.length > 1)
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
        <InputSelect
          options={[{ nome: "----" }, ...tipoForm]}
          id="tipoForm"
          gridColumn="2"
          label="Tipo Formulario"
          onChange={(e) => setCurrentTipoForm(e.target.value)}
          value={currentTipoForm}
        />
        <InputSelect
          label="Status"
          id="status"
          options={[
            { id: 1, nome: "Ativo" },
            { id: 2, nome: "Inativo" },
          ]}
          gridColumn="2"
          onChange={(e)=> setStatusForm(e.target.value)}
          value={statusForm}
        />
      </form>
    );
};

export default QuestionarioForm;

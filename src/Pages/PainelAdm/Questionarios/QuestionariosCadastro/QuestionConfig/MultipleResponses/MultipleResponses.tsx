import React, { useEffect, useState } from "react";
import InputText from "../../../../../../Components/Formularios/Forms/Input/InputText";
import plus from "../../../../../../assets/icons/plus.svg";
import sub from "../../../../../../assets/icons/sub.svg";
import styles from "./MultipleResponses.module.css";
import useFetch from "../../../../../../Hooks/useFetch";
import { GET_TO_WHERE } from "../../../../../../Api/api";
import { Option } from "../QuestionConfig";
import useToast from "../../../../../../Hooks/useToast";
import LoadingDots from "../../../../../../Components/Utils/LoadingDots/LoadingDots";

interface MultipleResponsesProps {
  question_id: string;
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const MultipleResponses = ({
  question_id,
  options,
  setOptions,
}: MultipleResponsesProps) => {
  const { request, loading, error, data } = useFetch();
  const [currentOptions, setCurrentOptions] = useState<Option[] | null>(null);
  const activeToast = useToast();

  useEffect(() => {
    async function fetchOptions() {
      if (question_id) {
        const { url, options } = GET_TO_WHERE(
          "subperguntas",
          "pergunta_id",
          question_id
        );
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setOptions(json.data);
        } else {
          activeToast({
            message: "Ocorreu um erro ao buscar opções",
            type: "error",
          });
        }
      }
    }

    fetchOptions();
  }, []);

  // Adiciona uma nova opção com um ID único
  const handleClick = () => {
    const newOption: Option = { id: options.length + 1, titulo: "" };
    setOptions([...options, newOption]);
  };

  // Atualiza o valor de uma opção específica
  const handleChange = (id: number, newValue: string) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, titulo: newValue } : option
    );
    setOptions(updatedOptions);
  };

  // Remove uma opção com base no ID
  const handleDelete = (id: number) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    const updateCurrentOptions = options.filter((option) => option.id !== id);
    setCurrentOptions(updateCurrentOptions)
    setOptions(updatedOptions);
  };

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div key={option.id} className={styles.input}>
          <InputText
            key={option.id}
            placeholder={`Opção ${option.id}`}
            value={option.titulo}
            onChange={(e) => handleChange(option.id, e.target.value)}
            id="multipleResponse"
          />
          <img
            onClick={() => handleDelete(option.id)}
            src={sub}
            alt="Remove Option"
            className={styles.icon}
          />
        </div>
      ))}
      <img
        onClick={handleClick}
        src={plus}
        alt="Add Option"
        className={styles.icon}
      />
    </div>
  );
};

export default MultipleResponses;

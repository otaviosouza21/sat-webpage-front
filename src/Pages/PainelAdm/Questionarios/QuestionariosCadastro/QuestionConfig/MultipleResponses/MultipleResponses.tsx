import React, { useState } from "react";
import InputText from "../../../../../../Components/Formularios/Forms/Input/InputText";
import plus from "../../../../../../assets/icons/plus.svg";
import sub from "../../../../../../assets/icons/sub.svg";
import styles from "./MultipleResponses.module.css";

// Definição do tipo para as opções
interface Option {
  id: number;
  value: string;
}

const MultipleResponses: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([{ id: 1, value: "" }]);

  // Adiciona uma nova opção com um ID único
  const handleClick = () => {
    const newOption: Option = { id: options.length + 1, value: "" };
    setOptions([...options, newOption]);
  };

  // Atualiza o valor de uma opção específica
  const handleChange = (id: number, newValue: string) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, value: newValue } : option
    );
    setOptions(updatedOptions);
  };

  // Remove uma opção com base no ID
  const handleDelete = (id: number) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div key={option.id} className={styles.input}>
          <InputText
            key={option.id}
            placeholder={`Opção ${option.id}`}
            value={option.value}
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

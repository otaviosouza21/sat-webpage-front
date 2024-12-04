import React, { useState } from "react";
import InputText from "../../../../../../Components/Forms/Input/InputText";
import plus from "../../../../../../assets/icons/plus.svg";
import sub from "../../../../../../assets/icons/sub.svg";
import styles from "./MultipleResponses.module.css";


const MultipleResponses = () => {
  const [options, setOptions] = useState([{ id: 1, value: "" }]);

  // Adiciona uma nova opção com um ID único
  const handleClick = () => {
    const newOption = { id: options.length + 1, value: "" };
    setOptions([...options, newOption]);
  };

  // Atualiza o valor de uma opção específica
  const handleChange = (id, newValue) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, value: newValue } : option
    );
    setOptions(updatedOptions);
  };

  const OptionDelete = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  }

  return (
    <div className={styles.container}>
        {options.map((option) => (
          <div key={option.id} className={styles.input}>
            <InputText
              key={option.id}
              placeholder={`Opção ${option.id}`}
              value={option.value}
              onChange={(e) => handleChange(option.id, e.target.value)}
              id='multipleRespose'
            />
            <img onClick={() => OptionDelete(option.id) } src={sub} alt="" />
          </div>
        ))}
      <img onClick={handleClick} src={plus} alt={"plus"} />
    </div>
  );
};

export default MultipleResponses;

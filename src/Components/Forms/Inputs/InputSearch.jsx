import React, { useRef } from "react";
import searchIcon from "../../../assets/icons/search.svg";
import styles from "./InputSearch.module.css";

const InputSearch = ({ id, placeholder, setVisibleItens, visibleItens }) => {
  const selectInput = useRef();

  function handleEnter(e) {
    const filterCampo = selectInput.current.value;

    const newVisible = visibleItens.filter((item) => {
      return item[filterCampo].includes(e.target.value);
    });
  
    setVisibleItens(newVisible);
  }

  return (
    <div className={styles.inputSearch}>
      <img src={searchIcon} alt="" />
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEnter(e);
          }
        }}
        placeholder={placeholder}
        type="text"
        name={id}
        id={id}
      />

      <select ref={selectInput} className={styles.options} name="" id="">
        <option value="nome_negocio">Serviço</option>
        <option value="usuario_id">Prestador</option>
      </select>
    </div>
  );
};

export default InputSearch;

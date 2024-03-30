import React from "react";
import searchIcon from "../../../assets/icons/search.svg";
import styles from "./InputSearch.module.css";

const InputSearch = ({ id, placeholder, setVisibleItens, visibleItens }) => {
  
  function handleEnter(e) {
    setVisibleItens(visibleItens);
    const { value } = e.target;
    console.log(value);
    const newVisible = visibleItens.filter((item) => {
      // Verificar se o valor de alguma propriedade inclui a string 'value'
      const contains = Object.values(item).some(
        (val) => typeof val === "string" && val.includes(value)
      );
      return contains;
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
    </div>
  );
};

export default InputSearch;

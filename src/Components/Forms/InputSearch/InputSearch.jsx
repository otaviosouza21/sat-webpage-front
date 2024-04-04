import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../../../assets/icons/search.svg";
import styles from "./InputSearch.module.css";

const InputSearch = ({ id, placeholder, setVisibleItens, visibleItens }) => {
  const selectInput = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [input, setInput] = useState("");
  const [noFilter, setNoFilter] = useState(visibleItens);

  useEffect(() => {
    const filterCampo = selectInput.current.value;
    if (!input) {
      setVisibleItens(noFilter);
      return;
    }

    const newVisible = visibleItens.filter((item) => {
      return String(item[filterCampo])
        .toLowerCase()
        .includes(input.toLowerCase());
    });

    setVisibleItens(newVisible);
  }, [input]);

  function filterItems(value) {
    /*     const filterCampo = selectInput.current.value;
    if (!value) {
      console.log(visibleItens);
      // Se o campo de pesquisa estiver vazio, mostre todos os itens
      setVisibleItens(visibleItens);
      return;
    }

    const newVisible = visibleItens.filter((item) => {
      return String(item[filterCampo]).toLowerCase().includes(value.toLowerCase());
    });

    setVisibleItens(newVisible); */
  }

  return (
    <div className={styles.inputSearch}>
      <img src={searchIcon} alt="" />
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        placeholder={placeholder}
        type="text"
        name={id}
        id={id}
      />
      <select
        ref={selectInput}
        className={styles.options}
        name=""
        id=""
        onChange={() => filterItems(searchTerm)}
      >
        <option value="nome_negocio">Serviço</option>
        <option value="usuario_id">Prestador</option>
      </select>
    </div>
  );
};

export default InputSearch;

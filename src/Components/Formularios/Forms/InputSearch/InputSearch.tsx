import React, { useRef, useState } from "react";
import searchIcon from "../../../../assets/icons/search.svg";
import styles from "./InputSearch.module.css";

// import useFetch from "../../../Hooks/useFetch";
import { useGlobalContext } from "../../../../Hooks/GlobalContext";

interface InputSearchProps extends React.ComponentProps<'div'> {
  id: string;
  placeholder: string;
  option: string;
}

const 
 InputSearch = ({ id, placeholder, option }:InputSearchProps) => {
  const selectInput = useRef<HTMLSelectElement | null>(null);
  // const [searchTerm, setSearchTerm] = useState("");
  // const { error, loading, request } = useFetch();
  const { inputPesquisa, setInputPesquisa } = useGlobalContext();

  if(selectInput.current)
  return (
    <div className={styles.inputSearch}>
      <img src={searchIcon} alt="" />
      <input
        onChange={({target})=>setInputPesquisa(target.value)}
        value={inputPesquisa}
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
        // onChange={() => filterItems(searchTerm)}
      >
        <option value={option}></option>
      </select>
    </div>
  );
};


export default InputSearch;

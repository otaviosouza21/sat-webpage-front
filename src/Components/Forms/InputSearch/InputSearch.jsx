import React, { useContext, useEffect, useRef, useState } from "react";
import searchIcon from "../../../assets/icons/search.svg";
import styles from "./InputSearch.module.css";
import { GET_INNER_SEARCH } from "../../../Api/api";
import useFetch from "../../../Hooks/useFetch";
import { GlobalContext } from "../../../Hooks/GlobalContext";

const 
 InputSearch = ({ id, placeholder, option }) => {
  const selectInput = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const { error, loading, request } = useFetch();
  const {servicos, setServicos,lastPage,setLastPage,notFind, setnotFind } = useContext(GlobalContext);


  
  useEffect(()=>{
    if(input.length >0){
      async function handleSearch(){
        const { url, options } = GET_INNER_SEARCH("servico", "usuario",page,input);
        const {json,response} = await request(url, options);
        if(response.ok){
          setServicos(json.servicos.retorno);
          setLastPage(json.paginacao.total_Pages)
        }else{
          setServicos(null);
          setLastPage(1)
          setnotFind(error)    
        }
      }
      handleSearch();
    } else {
      setServicos(servicos)
    }
  },[input])
 

  return (
    <div className={styles.inputSearch}>
      <img src={searchIcon} alt="" />
      <input
        onChange={({target})=>setInput(target.value)}
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
        <option value={option}></option>
      </select>
    </div>
  );
};


export default InputSearch;

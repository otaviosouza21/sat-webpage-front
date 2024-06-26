import React, { useEffect, useState } from "react";

const FilterInput = ({ colunas,tabela,setFiltered }) => {
const [colunaDoFiltro,setColunaDoFiltro] = useState(colunas[0])
const [currentFilter,setCurrentFilter] = useState('')



useEffect(()=>{
  const filtro = currentFilter.length > 0
  ? tabela.filter(repo => repo[colunaDoFiltro].toLowerCase().includes(currentFilter))
  : tabela
  setFiltered(filtro)
},[currentFilter])

  return (
    <div>
      <label htmlFor="">
        <input type="text" name="" id="" onKeyDown={(e)=>{e.key === 'Enter' ? setCurrentFilter(e.target.value.toLowerCase()) : ''}} />
        <select name="" id="" onChange={({target})=>setColunaDoFiltro(target.value)}>
          {colunas.map((coluna, id) => {
            return <option key={id}>{coluna}</option>;
          })}
        </select>
      </label>
    </div>
  );
};

export default FilterInput;

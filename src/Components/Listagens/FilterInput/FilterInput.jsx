import React, { useEffect, useState } from "react";

const FilterInput = ({ colunas,listaFiltrada,setListaFiltrada }) => {
const [colunaDoFiltro,setColunaDoFiltro] = useState(colunas[0])
const [currentFilter,setCurrentFilter] = useState('')

useEffect(()=>{
setListaFiltrada((listaFiltrada)=>{
    if(listaFiltrada) return listaFiltrada.filter(lista=>lista.nome.toLowerCase().includes(currentFilter))
}) 
},[currentFilter])

  return (
    <div>
      <label htmlFor="">
        <input type="text" name="" id="" onKeyDown={(e)=>{e.key === 'Enter' ? setCurrentFilter(e.target.value) : ''}} />
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

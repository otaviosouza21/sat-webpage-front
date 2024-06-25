import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import style from "./HeadSearch.module.css";

interface SearchTypes<T> {
  data: T[];
  setListaFiltrada: React.Dispatch<React.SetStateAction<any>>;
}

const HeadSearch = <T extends object>({
  data,
  setListaFiltrada,
}: SearchTypes<T>) => {
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [currentColumn, setCurrentColumn] = useState<string>("");

  if (data.length === 0) {
    return null; // ou retornar um placeholder, mensagem de erro, etc.
  }

  const optionsSearch = Object.keys(data[0]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentColumn) {
      const filterValue = e.currentTarget.value;
      setCurrentFilter(filterValue);
      filtraLista(filterValue);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentColumn(e.target.value);
  };

  const filtraLista = (filter: string) => {
    const newListFiltered = data.filter((item: any) => {
      return item[currentColumn]?.toString().toLowerCase().includes(filter.toLowerCase());
    });
    setListaFiltrada(newListFiltered);
  };

  return (
    <div className={style.container}>
      <select name="campos" id="" onChange={handleChange}>
        {optionsSearch.map((option, index) => (
            <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <input type="text" onKeyDown={handleKeyDown} />
    </div>
  );
};

export default HeadSearch;

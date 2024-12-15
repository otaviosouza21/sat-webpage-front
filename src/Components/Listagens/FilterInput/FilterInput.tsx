import React, { useEffect, useState } from "react";

interface FilterInputProps extends React.ComponentProps<"div"> {
  colunas: string[];
  tabela: Array<Record<string, string>>; 
  setFiltered: (filtered: Array<Record<string, string>>) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ colunas, tabela, setFiltered }) => {
  const [colunaDoFiltro, setColunaDoFiltro] = useState(colunas[0]); 
  const [currentFilter, setCurrentFilter] = useState(""); 

  useEffect(() => {
    const filtro =
      currentFilter.length > 0
        ? tabela.filter((repo) =>
            repo[colunaDoFiltro]?.toLowerCase().includes(currentFilter.toLowerCase())
          )
        : tabela;

    setFiltered(filtro);
  }, [currentFilter, colunaDoFiltro, tabela, setFiltered]);

  return (
    <div>
      <label>
        Filtro:
        <input
          type="text"
          placeholder="Digite para filtrar..."
          onChange={(e) => setCurrentFilter(e.target.value)}
        />
        <select onChange={({ target }) => setColunaDoFiltro(target.value)}>
          {colunas.map((coluna, id) => (
            <option key={id} value={coluna}>
              {coluna}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default FilterInput;

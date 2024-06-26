export const extrairColunas = (tabela) => {
    if (tabela) return tabela.map(Object.keys)[0];
  };

  
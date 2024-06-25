export function convertData(dataISO : string){
const data = new Date(dataISO);
function formatarData(data : Date) {
  // Obter o dia, mês e ano da data
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // getMonth() retorna mês de 0-11
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}


const dataFormatada = formatarData(data);

return dataFormatada
}
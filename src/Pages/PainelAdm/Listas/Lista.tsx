import styles from "./Listas.module.css";
import pen from "../../../assets/icons/pen.svg";
import trash from "../../../assets/icons/trash2.svg";

interface ListaProps<T> {
  tbody: T[];
  confirmDelete: (id: number) => void;
  atualizaDados: (id: number) => void;
}

const Lista = <T extends { [key: string]: any }>({
  tbody,
  confirmDelete,
  atualizaDados,
}: ListaProps<T>) => {
  if (tbody.length === 0) {
    return null; // Ou renderizar uma mensagem de aviso
  }

  const keysData = Object.keys(tbody[0]);

  return (
    <>
      <table className="table table-striped table-hover">
        <thead className={styles.head}>
          <tr>
            {keysData.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {tbody.map((data, rowIndex) => (
            <tr key={rowIndex} className={styles.row}>
              {keysData.map((key, cellIndex) => (
                <td style={{backgroundColor:data[key]}} key={cellIndex}>{data[key]}</td>
              ))}
              <td onClick={() => confirmDelete(data["ID"])}>
                <img src={trash} alt="Deletar" />
              </td>
              <td onClick={() => atualizaDados(data["ID"])}>
                <img src={pen} alt="Editar" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Lista;

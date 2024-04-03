import React, { useEffect, useState } from 'react'
import useFetch from '../../Hooks/useFetch';
import { GET_ALL } from '../../Api/api';
import Loading from '../Utils/Loading/Loading';

const ListCategoriasServicos = () => {
    const { request,loading } = useFetch();
    const [categorias, setCategorias] = useState(null);
  
    useEffect(() => {
      async function getCategorias() {
        const { url, options } = GET_ALL("categoria_servico");
        const { response, json } = await request(url, options);
        if (!response.ok) {
          console.log("Ocorreu um erro ao buscar Servicos");
        }
        setCategorias(json)
      }
  
      getCategorias();
    }, []);
  
  
  

  if(categorias)
    return (
      <section>
         {loading ? <Loading /> :
        <table className="table table-hover container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {categorias.map((categoria, index) => {
              return (
                <tr key={index}>
                  <td>{categoria.id}</td>
                  <td>{categoria.nome}</td>
                  <td>{categoria.status ? 'Ativo' : 'Inativo'}</td>
                  <td>
                      <button>Deletar</button>
                  </td>
                  <td>
                      <button>Alterar</button>
                  </td>
                </tr>
              );
            })} 
          </tbody>
        </table>
}
      </section>
    );
}

export default ListCategoriasServicos
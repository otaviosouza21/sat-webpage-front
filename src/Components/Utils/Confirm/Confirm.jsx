import React from 'react'

const Confirm = ({mensagem,id}) => {
  return (
    <div class="modal fade" id="showConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{mensagem}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ID: {id} teste
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
          <button type="button" class="btn btn-danger">Deletar</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Confirm
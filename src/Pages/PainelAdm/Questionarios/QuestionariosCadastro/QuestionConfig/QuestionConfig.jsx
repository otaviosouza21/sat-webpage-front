import React from 'react'
import InputText from '../../../../../Components/Forms/Input/InputText'
import Title from '../../../../../Components/Titles/Title'
import InputSelect from '../../../../../Components/Forms/Input/InputSelect'
import Button from '../../../../../Components/Button/Button'
import MultipleResponses from './MultipleResponses/MultipleResponses'



const QuestionConfig = () => {

function handleSubmit(){

}


  return (
    <form>
        <Title text='Nova Pergunta' fontSize='3' />
        <InputText label='Titulo da pergunta' />
        <InputText label='Descrição' />
        <InputSelect label='Tipo de Entrada' options={[{id: 1, nome: 'Texto' },{id: 1, nome: 'Multipla Escolha' } ]}/>
        <MultipleResponses />
        <Button handleSubmit={handleSubmit}>
        {'loading' ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  )
}

export default QuestionConfig
export interface EmailBodyProps{
      to: string,
      subject: string,
      text: string,
}


export interface UserAuth {
      token: string;
      usuario: CurrentUser;
      status: boolean;
      rule: number;
}

export interface Servicos{
      id: number;
      categoria_id: number;
      createdAt: string;
      descricao_servico: string;
      nome_negocio: string;
      possui_nome_negocio: boolean;
      status: boolean;
      tempo_negocio: number;
      updatedAt: string;
      usuario_id: number;   
}

export interface Categoria {
      nome: string;
      cor: string;
}
export interface ServicoUsuarioProps {
      categoria_id: number;
      createdAt: string;
      descricao_servico: string;
      id: number;
      nome_negocio: string;
      possui_nome_negocio: boolean;
      status: boolean;
      tempo_negocio: number;
      updatedAt: string;
      Usuario: CurrentUser;
      usuario_id: number;

}

export interface CategoriaInnerServico{
      id:number,
      nome:string,
      cor_categoria:string,
      Servicos:ServicoUsuarioProps[]
}
 
export interface CurrentUser{
      contato_negocio_01: string;
      contato_negocio_02: string;
      contato_pessoal_01: string;
      contato_pessoal_02: string;
      createdAt: string;
      email: string;
      id: number;
      nome: string;
      rule_id: number;
      socio_sat: boolean;
      updatedAt: string;
      tempo_reside:number;
}



export const defaultCurrentUser: CurrentUser = {
      contato_negocio_01: '',
      contato_negocio_02: '',
      contato_pessoal_01: '',
      contato_pessoal_02: '',
      createdAt: '',
      email: '',
      id: 0,
      nome: '',
      rule_id: 1,
      socio_sat: false,
      updatedAt: '',
      tempo_reside: 0,
};

export const defaultUserAuth: UserAuth= {
      token: "",
      usuario:defaultCurrentUser,
      status: false,
      rule: 1
}
export const defaultServicos: Servicos[] = [
      {
        id: 0,
        nome_negocio: '',
        usuario_id: 0,
        categoria_id: 0,
        createdAt: '',
        descricao_servico: '',
        possui_nome_negocio: false,
        status: false,
        tempo_negocio: 0,
        updatedAt: '',
      },
];

export const defaultServicosInnerUsuario: ServicoUsuarioProps={
      id: 0,
      possui_nome_negocio: false,
      nome_negocio: "",
      tempo_negocio: 0,
      descricao_servico: "",
      status: false,
      createdAt: "",
      updatedAt: "",
      categoria_id: 0,
      usuario_id: 0,
      Usuario: defaultCurrentUser
}


export const defaultCategoriaInnerServicos: CategoriaInnerServico[] = [
      {
            id: 0,
            nome: "",
            cor_categoria: "",
            Servicos:[defaultServicosInnerUsuario]
          }
];

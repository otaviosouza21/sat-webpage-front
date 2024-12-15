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
      categoria_id: number;
      createdAt: string;
      descricao_servico: string;
      id: number;
      nome_negocio: string;
      possui_nome_negocio: boolean;
      status: boolean;
      tempo_negocio: number;
      updatedAt: string;
      usuario_id: number;   
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
      servicos:Servicos[];
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
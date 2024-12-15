export interface EmailBodyProps {
  to: string;
  subject: string;
  text: string;
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
  Usuario: {
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
  };
  usuario_id: number;
}

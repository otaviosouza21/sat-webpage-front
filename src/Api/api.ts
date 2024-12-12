const PORT = 3333;
const URL = "http://localhost:3000";

export interface PropsApiReturn {
  url: string;
  options?: { 
    method: string; 
    headers?: { 
      Accept?: string;
      Authorization?: string;
      "Content-Type"?: string;
    }; 
    body?: string | Record<string, unknown>; // Tipo para o corpo da requisição
  }
}

//=================Retorna lista de dados====================//
export function GET_ALL(tableName: string) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}`,
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  };
}

//=================[autenticado] Retorna lista de usuarios====================//
export function GET_ALL_USERS(tableName: string, token: string) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}`,
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

//=================Retorna registro unico por ID====================//
export function GET_TO_ID(tableName: string, id: string) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  };
}

//=================Retorna registros com WHERE====================//
export function GET_TO_WHERE(tableName: string, column: string, id: string) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/${id}/${column}`,
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  };
}

//=================Cria novo usuario====================//
export function POST_DATA_USER(tableName: string, data: Record<string, unknown>) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/auth/register`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}

//=================Volta dados de acesso no login====================//
export function POST_LOGIN(tableName: string, data: Record<string, unknown>) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/auth/login`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}

//=================[autenticado] Retorna usuario unico====================//
export function GET_AUTH_USER(tableName: string, token: string, id: number) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

//=================Retorna lista de join ATIVOS com relação entre tabelas====================//
export function GET_INNER(
  tableName1: string,
  tableName2: string,
  page: number
) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName1}/${tableName2}/?page=${page}`,
    options: {
      method: "GET",
    },
  };
}

//=================Retorna lista de join TOTAL entre duas entidades====================//
export function GET_INNER_ALL(
  tableName1: string,
  tableName2: string,
  page: number
) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName1}/?page=${page}`,
    options: {
      method: "GET",
    },
  };
}

//=================Retorna lista de join entre duas entidades baseado no nome do servico====================//

export function GET_INNER_SEARCH(
  tableName1: string,
  tableName2: string,
  page: number,
  nomeServico: string
) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName1}/${tableName2}/?page=${page}&nome_negocio=${nomeServico}`,
    options: {
      method: "GET",
    },
  };
}

//=================Retorna dado unico com inner join====================//
export function GET_INNER_ID(
  tableName1: string,
  tableName2: string,
  id: number
) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName1}/${tableName2}/${id}`,
    options: {
      method: "GET",
    },
  };
}

//=================Cria novo registro====================//
export function POST_DATA(tableName: string, data: Record<string, unknown>) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}

//=================[autenticado] Atualiza registro====================//
export function UPDATE_DATA(
  tableName: string,
  updateData: Record<string, unknown>,
  id: number,
  token: string
) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    },
  };
}

//=================[autenticado] Deleta registro====================//
export function DELETE_DATA(tableName: string, id: number, token: string) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

/* //=================[autenticado] Deleta registro====================//
export function DELETE_DATA_FORM(tableName: string,  id: number) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/form/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
} */

//=================Envia email para reset de senha====================//
export function RECOVER_PASSWORD(tableName: string, email: string) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    },
  };
}

//=================[autenticado] definir nova senha====================//
export function UPDATE_PASSWORD(
  tableName: string,
  newPassword: string,
  token: string
) : PropsApiReturn {
  return {
    url: `${URL}/api/${tableName}/${token}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPassword),
    },
  };
}
//=================Envio de email====================//
export function SEND_EMAIL(emailBody: string) : PropsApiReturn {
  return {
    url: `${URL}/api/send-email`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    },
  };
}

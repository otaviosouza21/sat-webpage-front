const PORT = 3333;
//const URL = "https://taiacupeba.com.br";
const URL = "http://localhost:3333";


//=================Retorna lista de dados====================//
export function GET_ALL(tableName) {
  return {
    url: `${URL}/api/${tableName}`,
    options: {
      method: "GET",
      Headers: {
        Accept: "application/json",
      },
    },
  };
}

//=================[autenticado] Retorna lista de usuarios====================//
 export function GET_ALL_USERS(tableName, token) {
  return {
    url: `${URL}/api/${tableName}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token} `,
      },
    },
  };
}

//=================Retorna registro unico por ID====================//
export function GET_TO_ID(tableName, id) {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "GET",
      Headers: {
        Accept: "application/json",
      },
    },
  };
}

//=================Cria novo usuario====================//
export function POST_DATA_USER(tableName, data) {
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
export function POST_LOGIN(tableName, data) {
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
export function GET_AUTH_USER(tableName, token, id) {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token} `,
      },
    },
  };
}


//=================Retorna lista de join ATIVOS com relação entre tabelas====================//
export function GET_INNER(tableName1, tableName2,page) {
  return {
    url: `${URL}/api/${tableName1}/${tableName2}/?page=${page}`,
    options: {
      method: "GET"
    },
  };
}

//=================Retorna lista de join TOTAL entre duas entidades====================//
export function GET_INNER_ALL(tableName1, tableName2,page) {
  return {
    url: `${URL}/api/${tableName1}/?page=${page}`,
    options: {
      method: "GET"
    },
  };
}

//=================Retorna dado unico com inner join====================//
export function GET_INNER_ID(tableName1, tableName2,id) {
  return {
    url: `${URL}/api/${tableName1}/${tableName2}/${id}`,
    options: {
      method: "GET"
    },
  };
}

//=================Cria novo registro====================//
export function POST_DATA(tableName, data) {
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
export function UPDATE_DATA(tableName, updateData, id, token) {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(updateData),
    },
  };
}

//=================[autenticado] Deleta registro====================//
export function DELETE_DATA(tableName, id, token) {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    },
  };
}

//=================Envia email para reset de senha====================//
export function RECOVER_PASSWORD(tableName,email) {
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
export function UPDATE_PASSWORD(tableName,newPassword,token) {
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
export function SEND_EMAIL(emailBody) {
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
const PORT = 3333;
const URL = "https://taiacupeba.com.br";


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

export function GET_INNER(tableName1, tableName2) {
  return {
    url: `${URL}/api/${tableName1}/${tableName2}`,
    options: {
      method: "GET"
    },
  };
}

export function GET_INNER_ID(tableName1, tableName2,id) {
  return {
    url: `${URL}/api/${tableName1}/${tableName2}/${id}`,
    options: {
      method: "GET"
    },
  };
}

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
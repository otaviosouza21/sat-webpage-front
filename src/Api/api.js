const PORT = 3333;
const URL = "http://18.231.121.86";

export function GET_ALL(tableName) {
  return {
    url: `${URL}:${PORT}/${tableName}`,
    options: {
      method: "GET",
      Headers: {
        Accept: "application/json",
      },
    },
  };
}

export function GET_TO_ID(tableName, id) {
  return {
    url: `${URL}:${PORT}/${tableName}/${id}`,
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
    url: `${URL}:${PORT}/${tableName}/auth/register`,
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
    url: `${URL}:${PORT}/${tableName}/auth/login`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}

export function AUTH_LOGIN(tableName, token, data) {
  return {
    url: `${URL}:${PORT}/${tableName}/auth/${token}`,
    options: {
      method: "POST",
      headers: {
        Autorization: `Bearer ${token} `
      },
      body: JSON.stringify(data),
    },
  };
}

export function POST_DATA(tableName, data) {
  return {
    url: `${URL}:${PORT}/${tableName}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}

export function UPDATE_DATA(tableName, updateData, id) {
  return {
    url: `${URL}:${PORT}/${tableName}/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    },
  };
}

export function DELETE_DATA(tableName, id) {
  return {
    url: `${URL}:${PORT}/${tableName}/${id}`,
    options: {
      method: "DELETE",
    },
  };
}

const PORT = 3333;
const URL = "http://localhost";

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
import axios from "axios";

export async function createTodo(data: any, token: string) {
  const response = await axios.post(
    "http://localhost:1337/api/todos",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export async function getTodos(token: string) {
  const { data } = await axios.get("http://localhost:1337/api/todos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);

  return data;
}

export async function updateTodo(id: number, data: any, token: string) {
  const response = await axios.put(
    `http://localhost:1337/api/todos/${id}`,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export async function deleteTodo(id: number, token: string) {
  const response = await axios.delete(`http://localhost:1337/api/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

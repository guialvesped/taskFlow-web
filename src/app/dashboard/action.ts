import axios from "axios";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function postTodo({
  title,
  todo_status,
  due_date,
  priority,
  description,
}: {
  title: string;
  todo_status: "todo" | "doing" | "done";
  due_date: Date;
  priority: "low" | "medium" | "high";
  description?: string;
}) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${STRAPI_URL}/api/todos`,
      {
        data: {
          title,
          todo_status,
          due_date,
          priority,
          description,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.error?.message || "Erro ao criar tarefa.",
    };
  }
}

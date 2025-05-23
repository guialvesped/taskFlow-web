"use client";

import { TodoCard } from "@/components/TodoCard";
import TodoDialog from "@/components/TodoDialog";
import { CircleCheckBig } from "lucide-react";
import { useEffect, useState } from "react";
import { getTodos } from "./action";

export default function DashboardPage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token não encontrado.");
        return;
      }

      try {
        const response = await getTodos(token);

        setTodos(response.data);
      } catch (err) {
        alert("Erro ao buscar os todos");
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-black">
      <div className="flex flex-row items-center justify-center gap-3 mb-6">
        <CircleCheckBig className="text-white w-28 h-38" />
        <h1 className="text-white text-[36px]">TaskFlow</h1>
      </div>

      <TodoDialog />

      {loading ? (
        <p className="text-white mt-8">Carregando...</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={{
                id: todo.id,
                title: todo.title,
                description: todo.description,
                todo_status: todo.todo_status,
                priority: todo.priority,
                dificulty: todo.dificulty,
                due_date: todo.due_date,
              }}
              setTodos={setTodos}
            />
          ))}
        </div>
      )}
    </main>
  );
}

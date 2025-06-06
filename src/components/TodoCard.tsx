import { deleteTodo } from "@/app/dashboard/action";
import { Trash2 } from "lucide-react";
import EditTodoDialog from "./EditTodoDialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  todo_status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high" | "very high";
  dificulty: "very easy" | "easy" | "medium" | "hard" | "very hard";
  due_date: string;
}

interface TodoCardProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const statusColors: Record<Todo["todo_status"], string> = {
  todo: "bg-gray-400",
  doing: "bg-yellow-400",
  done: "bg-green-500",
};

const priorityColors: Record<Todo["priority"], string> = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-orange-600",
  "very high": "text-red-600",
};

const priorityLabel: Record<Todo["priority"], string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  "very high": "Muito Alta",
};

const difficultyColors: Record<Todo["dificulty"], string> = {
  "very easy": "text-green-700",
  easy: "text-green-600",
  medium: "text-yellow-600",
  hard: "text-orange-600",
  "very hard": "text-red-600",
};

const difficultyLabel: Record<Todo["dificulty"], string> = {
  "very easy": "Muito Baixa",
  easy: "Baixa",
  medium: "Média",
  hard: "Difícil",
  "very hard": "Muito Difícil",
};

export function TodoCard({ todo, setTodos }: TodoCardProps) {
  const dueDate = new Date(todo.due_date).toLocaleDateString("pt-BR");

  const deletar = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token de autenticação não encontrado.");
        return;
      }

      await deleteTodo(todo.id, token);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      alert("Todo deletado com sucesso");
    } catch (error) {
      console.error("Erro ao deletar o todo:", error);
      alert("Erro ao deletar o todo");
    }
  };

  return (
    <Card className="w-full max-w-md border border-gray-300 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CardTitle className="text-xl font-semibold">
              {todo.title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <EditTodoDialog todo={todo} setTodos={setTodos} />
            <Button onClick={deletar} className="bg-white hover:bg-gray-100">
              <Trash2 className="text-red-600" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {todo.description && (
          <p className="text-gray-700 text-sm">{todo.description}</p>
        )}
        <div className="text-sm">
          <strong>Data limite:</strong> {dueDate}
        </div>
        <div className="text-sm">
          <strong>Prioridade:</strong>{" "}
          <span className={priorityColors[todo.priority]}>
            {priorityLabel[todo.priority]}
          </span>
        </div>
        <div className="text-sm">
          <strong>Dificuldade:</strong>{" "}
          <span className={difficultyColors[todo.dificulty]}>
            {difficultyLabel[todo.dificulty]}
          </span>
        </div>
        <Badge className={`${statusColors[todo.todo_status]} text-white`}>
          {todo.todo_status.toUpperCase()}
        </Badge>
      </CardContent>
    </Card>
  );
}

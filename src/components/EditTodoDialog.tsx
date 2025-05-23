"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateTodo } from "@/app/dashboard/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Todo } from "./TodoCard";

const todoSchema = z.object({
  title: z.string().nonempty("O título é obrigatório"),
  todo_status: z.enum(["todo", "doing", "done"], {
    errorMap: () => ({ message: "Selecione um status" }),
  }),
  due_date: z.date({ required_error: "Selecione uma data" }),
  priority: z.enum(["low", "medium", "high", "very high"], {
    errorMap: () => ({ message: "Selecione a prioridade" }),
  }),
  description: z.string().optional(),
  dificulty: z.enum(["very easy", "easy", "medium", "hard", "very hard"], {
    errorMap: () => ({ message: "Selecione a dificuldade" }),
  }),
});

type TodoFormValues = z.infer<typeof todoSchema>;

interface EditTodoDialogProps {
  todo?: {
    id: number;
    title: string;
    todo_status: "todo" | "doing" | "done";
    due_date: string;
    priority: "low" | "medium" | "high" | "very high";
    description?: string;
    dificulty: "very easy" | "easy" | "medium" | "hard" | "very hard";
  };
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function EditTodoDialog({
  todo,
  setTodos,
}: EditTodoDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      todo_status: "todo",
      priority: "low",
      description: "",
      due_date: new Date(),
      dificulty: "very easy",
    },
  });

  useEffect(() => {
    if (todo) {
      form.reset({
        title: todo.title,
        todo_status: todo.todo_status,
        priority: todo.priority,
        description: todo.description || "",
        due_date: new Date(todo.due_date),
        dificulty: todo.dificulty,
      });
    }
  }, [todo, form]);

  async function onSubmit(data: TodoFormValues) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado.");

      if (!todo) {
        throw new Error("Todo não encontrado.");
      }

      const updated = await updateTodo(todo.id, data, token);
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? { ...t, ...updated } : t))
      );
      alert("Todo atualizado com sucesso.");

      form.reset();
      setOpen(false);
    } catch (error: any) {
      alert(error?.message || "Erro ao salvar o Todo.");
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Todo</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Todo</DialogTitle>
          <DialogDescription>
            Atualize as informações do seu Todo"
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row gap-4 py-4"
          >
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="w-1/2 text-right">Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="w-1/4 text-right">
                      Prioridade
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-1">
                        <select
                          {...field}
                          className="w-xs rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-3 focus:ring-gray-300"
                        >
                          <option value="low">Baixa</option>
                          <option value="medium">Média</option>
                          <option value="high">Alta</option>
                          <option value="very high">Muito Alta</option>
                        </select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="w-1/4 text-right">
                      Data Limite
                    </FormLabel>
                    <FormControl>
                      <input
                        type="date"
                        ref={field.ref}
                        value={field.value.toISOString().split("T")[0]}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                        className="w-2/3 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-3 focus:ring-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="todo_status"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="w-1/4 text-right">Status</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-1">
                        <select {...field} className="input">
                          <option value="todo">Inicio</option>
                          <option value="doing">Em andamento</option>
                          <option value="done">Feito</option>
                        </select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="w-1/4 text-right">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="w-xs h-24" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dificulty"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="w-1/4 text-right">
                      Dificuldade
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-1">
                        <select
                          {...field}
                          className="w-xs rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-3 focus:ring-gray-300"
                        >
                          <option value="very easy">Muito Baixa</option>
                          <option value="easy">Baixa</option>
                          <option value="medium">Média</option>
                          <option value="hard">Alta</option>
                          <option value="very hard">Muito Alta</option>
                        </select>
                      </div>
                    </FormControl>
                    <FormMessage className="ml-28" />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-4">
                <Button type="submit">
                  {todo ? "Salvar Alterações" : "Criar Todo"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

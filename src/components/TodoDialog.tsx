"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createTodo } from "@/app/dashboard/action";
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
import { useState } from "react";
import { Todo } from "./TodoCard";
import { Textarea } from "./ui/textarea";

const todoSchema = z.object({
  title: z.string().nonempty("O título é obrigatório"),
  todo_status: z.enum(["todo", "doing", "done"], {
    errorMap: () => ({ message: "Selecione um status" }),
  }),
  due_date: z.date({
    required_error: "Selecione uma data",
  }),
  priority: z.enum(["low", "medium", "high", "very high"], {
    errorMap: () => ({ message: "Selecione a prioridade" }),
  }),
  description: z.string().optional(),
  dificulty: z.enum(["very easy", "easy", "medium", "hard", "very hard"], {
    errorMap: () => ({ message: "Selecione a dificuldade" }),
  }),
});

type TodoFormValues = z.infer<typeof todoSchema>;

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function TodoDialog({ setTodos }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      todo_status: "todo",
      priority: "low",
      description: "",
    },
  });

  async function onSubmit(data: TodoFormValues) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não encontrado no localStorage.");
      }

      const todo = await createTodo(data, token);
      setTodos((prev: Todo[]) => [...prev, todo]);

      form.reset();
      setOpen(false);
    } catch (error: any) {
      alert(
        error?.response?.data?.error?.message ||
          "Erro ao criar o Todo. Tente novamente."
      );
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Criar Todo</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Todo</DialogTitle>
          <DialogDescription>
            Insira as informações para criar um novo Todo.
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
                      <Input {...field} className="w-xs" />
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
                    <FormMessage className="ml-28" />
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
                        name={field.name}
                        ref={field.ref}
                        value={
                          field.value
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) => {
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          );
                        }}
                        onBlur={field.onBlur}
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
                        <select
                          {...field}
                          className="w-xs rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-3 focus:ring-gray-300"
                        >
                          <option value="todo">Inicio</option>
                          <option value="doing">Em andamento</option>
                          <option value="done">Feito</option>
                        </select>
                      </div>
                    </FormControl>
                    <FormMessage className="ml-28" />
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
                          <option value="" disabled>
                            Selecione a prioridade
                          </option>
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
                <Button type="submit">Criar Todo</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

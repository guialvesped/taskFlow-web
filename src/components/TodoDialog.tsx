"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "./ui/textarea";

const todoSchema = z.object({
  title: z.string().nonempty("O título é obrigatório"),
  todo_status: z.enum(["todo", "doing", "done"], {
    errorMap: () => ({ message: "Selecione um status" }),
  }),
  due_date: z.date({
    required_error: "Selecione uma data",
  }),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Selecione a prioridade" }),
  }),
  description: z.string().optional(),
});

type TodoFormValues = z.infer<typeof todoSchema>;

interface TodoDialogProps {
  postTodo: (data: TodoFormValues) => Promise<void>;
}

export default function TodoDialog({ postTodo }: TodoDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      todo_status: "todo",
      priority: "medium",
      description: "",
    },
  });

  function onSubmit(data: TodoFormValues) {
    console.log("Dados do Todo:", data);
    setOpen(false);
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
                          <option value="" disabled selected>
                            Selecione a prioridade
                          </option>
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
                          const value = e.target.value;
                          field.onChange(value ? new Date(value) : undefined);
                        }}
                        onBlur={field.onBlur}
                        className="w-1/3 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-3 focus:ring-gray-300"
                      />
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
                name="priority"
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
                          <option value="" disabled selected>
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

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
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Select, SelectContent, SelectItem } from "@radix-ui/react-select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { SelectTrigger, SelectValue } from "./ui/select";

// Schema de validação com Zod
const targetSchema = z.object({
  title: z.string().nonempty("O título é obrigatório"),
  target_status: z.enum(["todo", "doing", "done"], {
    errorMap: () => ({ message: "Selecione um status" }),
  }),
  due_date: z.date({
    required_error: "Selecione uma data",
  }),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Selecione a prioridade" }),
  }),
});

type TargetFormValues = z.infer<typeof targetSchema>;

export default function TargetDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<TargetFormValues>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      title: "",
      target_status: "todo",
      priority: "medium",
    },
  });

  function onSubmit(data: TargetFormValues) {
    console.log("Dados da Target:", data);
    // Aqui você pode chamar uma action para salvar no Strapi
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Criar Target</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Target</DialogTitle>
          <DialogDescription>
            Insira as informações para criar uma nova target.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            {/* Título */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Título</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="target_status"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Status</FormLabel>
                  <FormControl className="col-span-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">A Fazer</SelectItem>
                        <SelectItem value="doing">Fazendo</SelectItem>
                        <SelectItem value="done">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />

            {/* Prioridade */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Prioridade</FormLabel>
                  <FormControl className="col-span-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />

            {/* Data de entrega */}
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Entrega</FormLabel>
                  <FormControl className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd/MM/yyyy")
                            : "Selecione a data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button type="submit">Criar Target</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

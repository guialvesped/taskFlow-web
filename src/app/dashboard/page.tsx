import TodoDialog from "@/components/TodoDialog";
import { CircleCheckBig } from "lucide-react";
import { postTodo } from "./action";

export default function DashboardPage() {
  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-black">
      <div className="flex flex-row items-center justify-center gap-3">
        <CircleCheckBig className="text-white w-28 h-38" />
        <h1 className="text-white text-[36px]">TaskFlow</h1>
      </div>
      <TodoDialog
        postTodo={async (data) => {
          await postTodo(data);
        }}
      />
    </main>
  );
}

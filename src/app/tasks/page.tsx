"use client";
import Task from "@/app/tasks/components/Task";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { doLogout } from "@/app/actions";
import TaskModal from "./components/TaskModal";
import useGetTasks from "./hooks/useGetTasks";
import useCreateTask from "./hooks/useCreateTask";
import { Task as TaskProps } from "./types";
import { redirect } from "next/navigation";

export default function Tasks() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTasks, tasks } = useGetTasks();
  const { addTask } = useCreateTask();
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const isAdmin = useMemo(() => {
    return session.data?.user?.role === "admin";
  }, [session]);

  useEffect(() => {
    getTasks();
  }, []);

  const addNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addTask({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: "in_progress",
      assignedTo: formData.get("assign_to") as string,
    });
    setIsOpen(false);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  if (session.status === "loading") return null;
  if (!isAuthenticated) redirect("/login");
  return (
    <div className="pt-[50px] px-[100px] flex flex-col gap-[50px]">
      <div className="w-full flex justify-between">
        <Image src="/logo.svg" width={82} height={28} alt="taski" />
        <div
          className="flex gap-2.5 items-center cursor-pointer"
          onClick={doLogout}
        >
          <p className="text-[18px] font-semibold">
            {session.data?.user?.firstName}
          </p>
          <Image src="/avatar.svg" width={45} height={45} alt="avatar" />
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h2 className="text-[28px] font-bold">
          Welcome,
          <span className="text-primary">{session.data?.user?.firstName}</span>
        </h2>
        <p className="text-[18px] text-slate-blue">
          Your team got {tasks.length} tasks to do.
        </p>
      </div>
      {(isAdmin
        ? tasks
        : tasks.filter(
            (task: TaskProps) =>
              task.assignedTo === session.data?.user?.username
          )
      ).map((task, index) => (
        <Task task={task} key={index} isAdmin={isAdmin} />
      ))}

      {isAdmin && (
        <button
          className="border-none flex gap-[15px] outline-none cursor-pointer text-slate-blue text-[18px] font-semibold"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Image
            src="/icons/AddTaskIcon.svg"
            width={24}
            height={24}
            alt="add-task"
          />
          Add a new task...
        </button>
      )}

      {isOpen && <TaskModal onSave={addNewTask} onCancel={onCancel} />}
    </div>
  );
}

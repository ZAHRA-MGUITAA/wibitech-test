import Image from "next/image";
import Button from "@/components/design-system/atoms/Button";
import { Task as TaskProps } from "@/app/tasks/types";
import TaskModal from "@/app/tasks/components/TaskModal";
import { useState } from "react";
import useEditTask from "@/app/tasks/hooks/useEditTask";
import useDeleteTask from "@/app/tasks/hooks/useDeleteTask";
import { useTaskStore } from "@/store/task-store";

export default function Task({
  task,
  isAdmin,
}: {
  task: TaskProps;
  isAdmin?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { editTask } = useEditTask();
  const { deleteTask } = useDeleteTask();
  const { fetchTasks } = useTaskStore();

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      status: "in_progress",
      assignedTo: formData.get("assign_to"),
    };
    const id = Number(formData.get("id"));
    await editTask(id, payload as TaskProps);
    setIsOpen(false);
    fetchTasks();
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const makeTaskDone = () => {
    editTask(task.id as number, { ...task, status: "done" });
  };

  return (
    <div className="flex justify-between bg-pale-white px-5 py-[15px] rounded-[15px] group overflow-hidden">
      <div className="flex gap-2.5 w-2/3 overflow-hidden">
        {task.status === "done" && (
          <Image
            src="/icons/Checkmark.svg"
            width={34}
            height={34}
            alt="check"
          />
        )}
        <div>
          <p className="text-[13px] font-normal text-primary">
            @ {task.assignedTo}
          </p>
          <h3
            className={`text-[18px] font-semibold ${
              task.status === "done" && "line-through"
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`text-[14px] text-slate-blue w-full truncate text-ellipsis ${
              task.status === "done" && "line-through"
            }`}
          >
            {task.description}
          </p>
        </div>
      </div>

      <div className="hidden gap-2.5 items-center group-hover:flex">
        <button
          className="border-none outline-none cursor-pointer w-12"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Image
            src="/icons/Edit.svg"
            width={34}
            height={34}
            alt="edit"
            className="cursor-pointer"
          />
        </button>
        {isAdmin && (
          <button
            className="border-none outline-none cursor-pointer w-12"
            onClick={async () => {
              await deleteTask(task.id as number);
              fetchTasks();
            }}
          >
            <Image
              src="/icons/Delete.svg"
              width={34}
              height={34}
              alt="delete"
              className="cursor-pointer"
            />
          </button>
        )}

        <Button
          label="Done"
          icon="/icons/CheckCircle.svg"
          className="h-12 cursor-pointer w-12"
          onClick={makeTaskDone}
        />
      </div>
      {isOpen && <TaskModal task={task} onSave={onSave} onCancel={onCancel} />}
    </div>
  );
}

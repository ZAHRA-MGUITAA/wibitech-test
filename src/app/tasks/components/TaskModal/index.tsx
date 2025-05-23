import Button from "@/components/design-system/atoms/Button";
import Input from "@/components/design-system/atoms/Input";
import { createPortal } from "react-dom";
import useGetUsers from "@/app/tasks/hooks/useGetUsers";
import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { Task } from "@/app/tasks/types";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function TaskModal({
  task,
  onSave,
  onCancel,
}: {
  task?: Task;
  onSave: FormEventHandler;
  onCancel: () => void;
}) {
  const { getUsers, users } = useGetUsers();
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo);
  const session = useSession();
  const isAdmin = useMemo(() => {
    return session.data?.user?.roles === "admin";
  }, [session]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {createPortal(
        <div className="fixed bg-[#F0F0F0A6] z-50 flex flex-col items-center justify-center inset-0">
          <form onSubmit={onSave}>
            <div className="w-[600px] bg-white p-5 rounded-[20px] flex flex-col gap-5">
              <Input
                name="id"
                type="hidden"
                className="w-1/2"
                value={task?.id}
              />
              <div className="flex gap-[15px]">
                <Input
                  name="title"
                  type="text"
                  label="Task title"
                  placeholder="What’s in your mind?"
                  className={isAdmin ? "!w-1/2" : "!w-full"}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                {isAdmin && (
                  <div className="flex flex-col gap-2.5 w-1/2">
                    <label
                      htmlFor="assign_to"
                      className="text-[14px] font-semibold text-black"
                    >
                      Assign to
                    </label>
                    <div className="w-full relative">
                      <select
                        name="assign_to"
                        className="w-full rounded-[15px] bg-gray p-[15px] box-border h-12 outline-none appearance-none cursor-pointer"
                        value={assignedTo}
                        onChange={(e) => {
                          setAssignedTo(e.target.value);
                        }}
                      >
                        {users
                          .filter((user) => user.role === "user")
                          .map((user, index) => (
                            <option key={index} value={user.username}>
                              {user.username}
                            </option>
                          ))}
                      </select>
                      <Image
                        src="/icons/ChevronDown.svg"
                        width={24}
                        height={24}
                        alt="ChevronDown"
                        className="absolute right-2.5 top-2.5"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="description"
                  className="text-[14px] font-semibold text-black"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  className="rounded-[15px] bg-gray p-[15px] box-border h-[120px] outline-none"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                >
                  {description}
                </textarea>
              </div>

              <div className="flex gap-[15px] justify-end">
                <Button
                  label="Cancel"
                  className="!w-fit cursor-pointer"
                  onClick={onCancel}
                  type="button"
                />
                <Button label="Save" className="!w-fit cursor-pointer" />
              </div>
            </div>
          </form>
        </div>,
        document.body
      )}
    </>
  );
}

import axios from "axios";
import useGetTasks from "./useGetTasks";
import { Task } from "../types";

export default function useCreateTask() {
  const { getTasks } = useGetTasks();

  const addTask = async (payload: Task) => {
    const res = await axios.post("/api/task", payload);
    getTasks();
    return res.data;
  };

  return { addTask };
}

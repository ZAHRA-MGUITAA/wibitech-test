import axios from "axios";
import { Task } from "../types";

export default function useCreateTask() {
  const addTask = async (payload: Task) => {
    const res = await axios.post("/api/task", payload);
    return res.data;
  };

  return { addTask };
}

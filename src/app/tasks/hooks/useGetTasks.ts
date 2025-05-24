import axios from "axios";
import { useState } from "react";
import { Task } from "../types";

export default function useGetTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const getTasks = async () => {
    const res = await axios.get("/api/task/list");
    setTasks(res.data.data);
    return res.data;
  };

  return { getTasks, tasks, setTasks };
}

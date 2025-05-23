import axios from "axios";
import { useState } from "react";

export default function useGetTasks() {
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    const res = await axios.get("/api/task/list");
    setTasks(res.data.data);
    return res.data;
  };

  return { getTasks, tasks };
}

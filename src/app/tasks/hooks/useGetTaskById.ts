import axios from "axios";
import { useState } from "react";

export default function useGetTaskById() {
  const [tasks, setTasks] = useState();
  const getTask = async (id: string) => {
    const res = await axios.get(`/api/task/${id}`);
    setTasks(res.data.data);
    return res.data;
  };

  return { getTask, tasks };
}

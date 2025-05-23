import axios from "axios";
import useGetTasks from "./useGetTasks";

export default function useCreateTask() {
  const { getTasks } = useGetTasks();

  const addTask = async (payload: any) => {
    const res = await axios.post("/api/task", payload);
    getTasks();
    return res.data;
  };

  return { addTask };
}

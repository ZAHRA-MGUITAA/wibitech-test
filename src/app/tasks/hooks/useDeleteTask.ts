import axios from "axios";
import useGetTasks from "./useGetTasks";

export default function useDeleteTask() {
  const { getTasks } = useGetTasks();
  const deleteTask = async (id: number) => {
    const res = await axios.delete(`/api/task/${id}/delete`);
    await getTasks();
    return res.data;
  };

  return { deleteTask };
}

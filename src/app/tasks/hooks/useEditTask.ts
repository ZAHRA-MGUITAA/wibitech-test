import axios from "axios";
import { Task } from "../types";

export default function useEditTask() {
  const editTask = async (id: number, payload: Task) => {
    const res = await axios.put(`/api/task/${id}/edit`, payload);
    return res.data;
  };

  return { editTask };
}

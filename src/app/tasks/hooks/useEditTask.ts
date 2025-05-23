import axios from "axios";

export default function useEditTask() {
  const editTask = async (id: number, payload: any) => {
    const res = await axios.put(`/api/task/${id}/edit`, payload);
    return res.data;
  };

  return { editTask };
}

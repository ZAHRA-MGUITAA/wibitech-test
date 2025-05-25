import axios from "axios";
import { create } from "zustand";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  assignedTo: string;
  status: string;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/task/list");
      const tasks = response.data.data;
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

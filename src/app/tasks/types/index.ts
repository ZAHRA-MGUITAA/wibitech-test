export type User = {
  firstName: string;
  lastName: string;
  username: string;
  role: "user" | "admin";
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  assignedTo: string;
  status: string;
};

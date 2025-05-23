import axios from "axios";
import { useState } from "react";
import { User } from "../types";

export default function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data.data);
    return res.data;
  };

  return { getUsers, users };
}

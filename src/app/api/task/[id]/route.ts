import { auth } from "@/auth";
import axios from "axios";

export async function GET(req: Request) {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  const id = req.json();

  const response = await axios.get(`${process.env.API_HOST}/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.data;
  return Response.json({ data });
}

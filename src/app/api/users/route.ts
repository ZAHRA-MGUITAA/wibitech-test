import { auth } from "@/auth";
import axios from "axios";

export async function GET() {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  const response = await axios.get(`${process.env.API_HOST}/api/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.data;

  return Response.json({ data });
}

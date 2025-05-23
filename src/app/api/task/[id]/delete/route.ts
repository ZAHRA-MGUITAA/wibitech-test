import { auth } from "@/auth";
import axios from "axios";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  const response = await axios.delete(
    `${process.env.API_HOST}/api/tasks/${Number(id)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.data;

  return Response.json({ data });
}

import { auth } from "@/auth";
import axios from "axios";
import { handleApiError } from "../../apiError/apiResponse";

export async function GET(req: Request) {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  const id = req.json();
  try {
    const response = await axios.get(
      `${process.env.API_HOST}/api/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.data;
    return Response.json({ data });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

import { auth } from "@/auth";
import axios from "axios";
import { handleApiError } from "../apiError/apiResponse";

export async function POST(request: Request) {
  const payload = await request.json();
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  try {
    const response = await axios.post(
      `${process.env.API_HOST}/api/tasks`,
      payload,
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

import { AxiosError } from "axios";
import { ApiError } from "./apiError";

export const handleApiError = (error: unknown) => {
  // Handle Api errors
  if (error instanceof AxiosError) {
    if (error?.response?.data.fields as []) {
      return Response.json({ error: error.response?.data }, { status: 400 });
    } else {
      return Response.json(
        {
          message: "An error occurred while making the request.",
          error: error?.response?.data,
        },
        { status: 500 }
      );
    }
  }

  // Handle custom ApiError
  if (error instanceof ApiError) {
    return Response.json(
      {
        statusCode: error.statusCode,
        message: error.message || "Internal Server Error",
      },
      { status: error.statusCode }
    );
  }

  // Fallback for unknown errors
  return Response.json(
    { statusCode: 500, message: "Internal Server Error" },
    { status: 500 }
  );
};

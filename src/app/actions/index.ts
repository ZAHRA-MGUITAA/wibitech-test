"use server";

import { signIn, signOut } from "@/auth";
import { handleApiError } from "../api/apiError/apiResponse";

export async function credentialsSignin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    if (response?.error) {
      return { success: false, error: response.error };
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/login" });
}

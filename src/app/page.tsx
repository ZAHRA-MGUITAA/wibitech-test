"use client";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  if (isAuthenticated) {
    redirect("/tasks");
  } else {
    redirect("/login");
  }
}

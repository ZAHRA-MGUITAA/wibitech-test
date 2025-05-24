"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Content() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/tasks");
    } else {
      redirect("/login");
    }
  }, [status]);

  return <></>;
}

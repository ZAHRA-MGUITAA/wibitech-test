"use client";
import Button from "@/components/design-system/atoms/Button";
import Input from "@/components/design-system/atoms/Input";
import Image from "next/image";
import { credentialsSignin } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const response = await credentialsSignin(formData);

      if (!!response.error) {
        setError(response.error);
      } else {
        router.push("/tasks");
      }
    } catch (error) {
      setError("Check your Credentials");
    }
  };
  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="rounded-[25px] p-[25px] flex flex-col gap-20 w-[380px] border border-primary">
        <div className="flex justify-center">
          <Image
            src="/logo.svg"
            width={82}
            height={28}
            alt="taski"
            className="items-center"
          />
        </div>
        {error && <p>{error}</p>}
        <div className="flex flex-col gap-[30px]">
          <h2 className="text-[28px] font-semibold text-center">Login</h2>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-2.5">
              <Input
                name="username"
                label="Username"
                type="text"
                placeholder="leslie@pixsellz.io"
              />
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="password"
              />
            </div>

            {/* <button type="submit">Login</button> */}
            <Button label="Login" type="submit" className="mt-5" />
          </form>
        </div>
      </div>
    </div>
  );
}

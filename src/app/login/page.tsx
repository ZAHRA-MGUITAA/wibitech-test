"use client";
import Button from "@/components/design-system/atoms/Button";
import Input from "@/components/design-system/atoms/Input";
import Image from "next/image";
import { credentialsSignin } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const { update } = useSession();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const response = await credentialsSignin(formData);

      if (!!response.error) {
        throw Error(response.error);
      } else {
        await update();
        router.push("/tasks");
      }
    } catch (error) {
      console.error(error);
      toast.error("email or password not correct.", { position: "top-right" });
    }
  };
  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="rounded-[25px] p-[25px] flex flex-col gap-20 w-[380px] border border-primary">
        <div className="flex justify-center">
          <Image
            src="/Logo.svg"
            width={82}
            height={28}
            alt="taski"
            className="items-center"
          />
        </div>
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

            <Button
              label="Login"
              type="submit"
              className="mt-5 text-center justify-center cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

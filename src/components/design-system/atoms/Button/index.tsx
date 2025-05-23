import Image from "next/image";
import { ButtonProps } from "./types";

export default function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      className={`bg-primary py-3 px-[15px] rounded-[15px] text-white w-full flex gap-2 items-center ${props.className}`}
      onClick={props.onClick}
    >
      {props.icon && (
        <Image src={props.icon} width={24} height={24} alt="icon" />
      )}
      {props.label}
    </button>
  );
}

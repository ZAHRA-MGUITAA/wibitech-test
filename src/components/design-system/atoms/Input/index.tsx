import { InputProps } from "./types";

export default function Input(props: InputProps) {
  return (
    <div className={`flex flex-col gap-2.5 ${props.className}`}>
      {props.label && (
        <label
          htmlFor={props.name}
          className="text-[14px] font-semibold text-black"
        >
          {props.label}
        </label>
      )}
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        className="rounded-[15px] bg-gray p-[15px] box-border h-12 outline-none"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

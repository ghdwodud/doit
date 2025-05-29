import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function StyledInput({
  value,
  onChange,
  onKeyDown,
  className = "",
}: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="할 일을 입력해주세요"
      className={`w-full h-[52.5px] bg-slate-100 border-2 border-[#0F172A] rounded-[24px] px-4 py-2 focus:outline-none focus:ring focus:border-blue-400 ${className}`}
    />
  );
}

"use client";

import { useRouter } from "next/navigation";

type TextStyleOption =
  | "default"
  | "underline"
  | "strikethrough"
  | "bold20"
  | "labelSmall";

const getTextClassName = (style: TextStyleOption = "default") => {
  switch (style) {
    case "underline":
      return "text-[20px] font-bold underline";
    case "strikethrough":
      return "text-[16px] font-normal line-through";
    case "bold20":
      return "text-[20px] font-bold";
    case "labelSmall":
      return "text-[14px] font-medium";
    default:
      return "text-[16px] font-normal";
  }
};

type Props = {
  id: number;
  label: string;
  checked?: boolean;
  onToggle?: () => void;
  textStyle?: TextStyleOption;
};

export default function CheckItem({
  id,
  label,
  checked = false,
  onToggle,
  textStyle = "default",
}: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/items/${id}`)}
      className={`w-full h-[64px] flex items-center px-6 rounded-full gap-4 cursor-pointer ${
        checked
          ? "bg-[#DDD6FE] border-2 border-[#0F172A]"
          : "border border-[#0F172A]"
      }`}
    >
      <div
        className="w-8 h-8 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
      >
        {checked ? (
          <img
            src="/assets/ic/Property%201=Frame%202610233.png"
            srcSet="/assets/ic/Property%201=Frame%202610233@2x.png 2x, /assets/ic/Property%201=Frame%202610233@3x.png 3x"
            alt="체크됨"
            className="w-8 h-8"
          />
        ) : (
          <img
            src="/assets/ic/Property%201=Default.png"
            srcSet="/assets/ic/Property%201=Default@2x.png 2x, /assets/ic/Property%201=Default@3x.png 3x"
            alt="체크안됨"
            className="w-8 h-8"
          />
        )}
      </div>

      <span
        className={`text-[#0F172A] font-['NanumSquare'] flex-1 ${getTextClassName(
          textStyle
        )}`}
      >
        {label}
      </span>
    </div>
  );
}

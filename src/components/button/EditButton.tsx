"use client";

type Props = {
  active?: boolean;
  onClick?: () => void;
};

export default function EditButton({ active = false, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-[168px] h-[56px] rounded-[24px] font-bold text-[16px] leading-[18px]
        border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_#0F172A]
        flex items-center justify-center gap-2
        ${active ? "bg-lime-300 text-[#0F172A]" : "bg-[#E2E8F0] text-[#0F172A]"}
      `}
    >
      {/* 체크 이미지 아이콘 */}
      <img
        src="/assets/ic/check.png"
        srcSet="/assets/ic/check@2x.png 2x, /assets/ic/check@3x.png 3x"
        alt="체크 아이콘"
        className="w-4 h-4"
      />
      <span className="font-['NanumSquare']">수정 완료</span>
    </button>
  );
}

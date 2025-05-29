"use client";

type Props = {
  onClick?: () => void;
  isMobile?: boolean;
};

export default function AddButton({ onClick, isMobile = false }: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[24px] border-2 border-[#0F172A] bg-[#E2E8F0] 
        shadow-[4px_4px_0px_0px_#0F172A] flex items-center justify-center
        ${
          isMobile
            ? "w-[56px] h-[56px]"
            : "w-[168px] h-[56px] gap-2 text-[#0F172A] font-bold text-[16px] leading-[18px]"
        }`}
    >
      <img
        src="/assets/ic/Property%201=plus.svg"
        alt="추가 아이콘"
        className="w-4 h-4"
      />
      {!isMobile && <span className="font-['NanumSquare']">추가하기</span>}
    </button>
  );
}

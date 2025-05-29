"use client";

type Props = {
  onClick?: () => void;
};

export default function DeleteButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-[168px] h-[56px] rounded-[24px] border-2 border-[#0F172A]
        bg-[#F43F5E] text-white font-bold text-[16px] leading-[18px]
        flex items-center justify-center gap-2
        shadow-[4px_4px_0px_0px_#0F172A]"
    >
      {/* X 아이콘 이미지 */}
      <img
        src="/assets/ic/X.png"
        srcSet="/assets/ic/X@2x.png 2x, /assets/ic/X@3x.png 3x"
        alt="삭제 아이콘"
        className="w-4 h-4"
      />
      <span className="font-['NanumSquare']">삭제하기</span>
    </button>
  );
}

// src/components/Header.tsx

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-10 bg-white border-b">
  <div className="h-full flex items-center">
    <div className="pl-[151px] flex justify-between items-center w-full max-w-screen-xl mx-auto">
      {/* 로고 */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="사이트 로고"
          width={80}
          height={24}
        />
      </Link>
    </div>
  </div>
</header>

  );
}

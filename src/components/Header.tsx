// src/components/Header.tsx

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-10 bg-white border-b">
      <div className="h-full flex items-center">
        <div className="pl-4 sm:pl-[151px] flex justify-between items-center w-full max-w-screen-xl mx-auto">
          {/* 로고 */}
          <Link href="/">
            {/* 데스크탑용 로고 */}
            <Image
              src="/assets/Size=Large.png"
              alt="사이트 로고"
              width={80}
              height={24}
              className="hidden sm:block"
            />

            {/* 모바일/태블릿용 로고 */}
            <Image
              src="/assets/Size=Small.png"
              alt="모바일 로고"
              width={40}
              height={24}
              className="block sm:hidden"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

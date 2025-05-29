"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { get, del, patch, uploadImage } from "@/lib/api";
import DeleteButton from "@/components/button/DeleteButton";
import EditButton from "@/components/button/EditButton";
import CheckItem from "@/components/CheckItem";

type Todo = {
  id: number;
  name: string;
  memo: string;
  imageUrl?: string;
  isCompleted: boolean;
};

export default function ItemDetailPage() {
  const { itemId } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Todo | null>(null);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!itemId) return;
    get<Todo>(`/items/${itemId}`).then((data) => {
      setItem(data);
      setName(data.name || "");
      setMemo(data.memo || "");
    });
  }, [itemId]);

  const handleUpdate = async () => {
    if (!item) return;
    await patch(`/items/${item.id}`, {
      name,
      memo,
      imageUrl: item.imageUrl ?? "",
      isCompleted: item.isCompleted,
    });
    alert("수정 완료!");
  };

  const handleDelete = async () => {
    if (!item) return;
    await del(`/items/${item.id}`);
    alert("삭제 완료");
    router.push("/");
  };

  const handleToggle = async () => {
    if (!item) return;
    const updated = await patch<Todo>(`/items/${item.id}`, {
      name: item.name,
      isCompleted: !item.isCompleted,
    });
    setItem(updated);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;

    try {
      const data = await uploadImage(file);
      const imageUrl = data.url;
      if (!imageUrl) throw new Error("이미지 URL이 응답에 없음");

      setItem((prev) => {
        const updated = prev ? { ...prev, imageUrl } : null;
        if (updated) {
          patch(`/items/${updated.id}`, {
            name: updated.name,
            memo: updated.memo,
            imageUrl: updated.imageUrl,
            isCompleted: updated.isCompleted,
          }).then(() => {
            alert("이미지 업로드 및 반영 완료");
          });
        }
        return updated;
      });
    } catch (err) {
      console.error("❌ 이미지 업로드 실패", err);
      alert("이미지 업로드 실패");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  if (!item) return <div>불러오는 중...</div>;

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <CheckItem
          id={item.id}
          label={item.name}
          checked={item.isCompleted}
          textStyle="underline"
          onToggle={handleToggle}
        />

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* 이미지 영역 */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleImageDrop}
            className={`relative flex-shrink-0 w-full md:w-[384px] h-[311px] rounded-2xl border border-dashed
    flex justify-center items-center overflow-hidden cursor-pointer transition
    ${isDragging ? "bg-slate-200" : "bg-slate-100"}`}
          >
            <img
              src={item.imageUrl || "/assets/ic/img.png"}
              alt="첨부 이미지"
              className="object-contain max-w-full max-h-full"
            />

            {/* 이미지 업로드 버튼 & 숨겨진 input */}
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-4 right-4 w-[56px] h-[56px] rounded-full bg-white shadow-md flex items-center justify-center"
              >
                <img src="/assets/Type=Plus.png" alt="추가 버튼" />
              </button>
            </>
          </div>

          {/* 메모 영역 */}
          <div className="flex-1 min-w-[240px] flex flex-col">
            <div
              className="p-4 w-full h-[311px] rounded-[16px] bg-no-repeat bg-center bg-cover overflow-hidden"
              style={{ backgroundImage: "url('/assets/img/memo.png')" }}
            >
              <p className="text-sm font-bold text-orange-700 mb-2">Memo</p>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full h-[calc(311px-32px)] resize-none bg-transparent outline-none text-sm text-slate-900"
              />
            </div>

            <div className="flex gap-4 justify-end mt-4">
              <EditButton onClick={handleUpdate} active={item.isCompleted} />
              <DeleteButton onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

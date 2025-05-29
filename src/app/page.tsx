"use client";

import { useEffect, useState } from "react";
import AddButton from "@/components/button/AddButton";
import CheckItem from "@/components/CheckItem";
import StyledInput from "@/components/StyledInput";
import { get, patch, post } from "@/lib/api"; // 공통화된 api 모듈

type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  // ✅ 서버에서 초기 데이터 가져오기
  useEffect(() => {
    // 서버에서 데이터 가져오기
    get<Todo[]>("/items")
      .then((data) => setTodos(data))
      .catch((err) => console.error("데이터 불러오기 실패", err));

    // isMobile 판단 추가
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile(); // 초기 실행
    window.addEventListener("resize", checkIsMobile);

    // clean-up
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // ✅ 새로운 항목 추가
  const addTodo = async () => {
    if (input.trim() === "") return;
    try {
      const newItem = await post<Todo>("/items", { name: input }); // ✅ name으로 보냄
      setTodos((prev) => [...prev, newItem]);
      setInput("");
    } catch (err) {
      console.error("❌ 추가 실패:", err);
    }
  };

  // ✅ 체크 상태 토글
  const toggleChecked = async (id: number) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;

    try {
      const updated = await patch<Todo>(`/items/${id}`, {
        name: target.name, // ✅ 서버는 name 필드 요구함
        isCompleted: !target.isCompleted,
      });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err) {
      console.error("체크 상태 변경 실패", err);
    }
  };

  return (
    <main className="flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-[1200px] flex flex-row gap-4 md:items-center">
        {/* 입력창 + 버튼: 모바일 세로, 데스크탑 가로 */}
        <StyledInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          className="flex-1"
        />
        <AddButton onClick={addTodo} isMobile={isMobile} />
      </div>

      {/* TO DO / DONE 영역 */}
      <div className="w-full max-w-[1200px] flex flex-col gap-4 mt-6 md:flex-row md:justify-between">
        {/* TO DO */}
        <div className="w-full md:w-1/2 space-y-2 text-left">
          <img src="/assets/img/todo.png" alt="TO DO" className="h-8" />
          {todos.filter((todo) => !todo.isCompleted).length === 0 ? (
            <div className="flex flex-col items-center mt-4">
              <img
                src="/assets/img/Type=Todo,Size=Large.png"
                srcSet="/assets/img/Type=Todo,Size=Large@2x.png 2x, /assets/img/Type=Todo,Size=Large@3x.png 3x"
                alt="No Todos"
                className="w-[240px] h-[240px] object-contain"
              />
              <p className="mt-6 font-bold text-[16px] leading-[18px] text-slate-400 text-center font-[NanumSquare]">
                할 일이 없어요.
                <br />
                TODO를 새롭게 추가해주세요!
              </p>
            </div>
          ) : (
            todos
              .filter((todo) => !todo.isCompleted)
              .map((todo) => (
                <CheckItem
                  key={todo.id}
                  id={todo.id}
                  label={todo.name}
                  checked={false}
                  onToggle={() => toggleChecked(todo.id)}
                />
              ))
          )}
        </div>

        {/* DONE */}
        <div className="w-full md:w-1/2 space-y-2 text-left">
          <img src="/assets/img/done.png" alt="DONE" className="h-8" />
          {todos.filter((todo) => todo.isCompleted).length === 0 ? (
            <div className="flex flex-col items-center mt-4">
              <img
                src="/assets/img/Type=Done,Size=Large.png"
                srcSet="/assets/img/Type=Done,Size=Large@2x.png 2x, /assets/img/Type=Done,Size=Large@3x.png 3x"
                alt="No Done Items"
                className="w-[240px] h-[240px] object-contain"
              />
              <p className="mt-6 font-bold text-[16px] leading-[18px] text-slate-400 text-center font-[NanumSquare]">
                완료된 일이 없어요.
                <br />할 일을 완료해보세요!
              </p>
            </div>
          ) : (
            todos
              .filter((todo) => todo.isCompleted)
              .map((todo) => (
                <CheckItem
                  key={todo.id}
                  id={todo.id}
                  label={todo.name}
                  checked={true}
                  onToggle={() => toggleChecked(todo.id)}
                  textStyle="strikethrough"
                />
              ))
          )}
        </div>
      </div>
    </main>
  );
}

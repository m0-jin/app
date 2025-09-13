import React, { useState } from "react";
import useTimer from "../hooks/useTimer";
import Modal from "./Modal";

type Letter = {
  quiz: string;
  answer: string;
  content: string;
};

const letters: Letter[] = [
  {
    quiz: "Q1. 내가 제일 여행 가고 싶어하는 나라는?",
    answer: "포르투칼",
    content: "편지 1 💌\n명진이와의 포르투칼 여행 쿠폰",
  },
  {
    quiz: "Q2. 9월 18일 기준, 우리가 만난지 얼마나 됐을까? (숫자만)",
    answer: "961",
    content: "편지 2 💌\nUFC 경기 관람권",
  },
  {
    quiz: "Q3. 최근 내가 제일 좋아하는 색깔은? (예, 00색)",
    answer: "초록색",
    content: "편지 3 💌\n첼시 경기 관람권",
  },
];

const Timer = () => {
  const { day, hours, minutes, seconds } = useTimer();
  const [open, setOpen] = useState(false);
  const [openedLetter, setOpenedLetter] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState<boolean[]>([false, false, false]);

  const onClick = () => {
    setOpen(true);
  };

  const checkAnswer = (index: number) => {
    if (input.trim() === letters[index].answer) {
      const newSolved = [...solved];
      newSolved[index] = true;
      setSolved(newSolved);
      setOpenedLetter(null); // 퀴즈창 닫기
      setInput("");
    } else {
      alert("정답이 아니에요! 다시 시도해보세요.");
    }
  };

  return (
    <>
      {/* 타이머 */}
      <div className="flex flex-col items-center space-y-4 py-8 bg-blue1 shadow-md rounded-lg w-[70%] ">
        <span className="font-kangwon-bold text-xl text-white">
          ~ 종료까지 남은 시간 ~
        </span>
        <span className="font-kangwon-bold text-3xl text-white">
          {day}일 {hours}시간 {minutes}분 {seconds}초
        </span>
        <button
          onClick={onClick}
          className="w-[40%] py-2 bg-blue2 text-white rounded-full shadow-md font-kangwon-bold hover:bg-blue2/80 transition-all"
        >
          선물 받으러 가기
        </button>
      </div>

      {/* 모달 */}
      <Modal open={open} onClose={() => setOpen(false)} title="🎁 선물을 위한 퀴즈">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {letters.map((letter, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {!solved[index] ? (
                <>
                  {openedLetter === index ? (
                    <>
                      <div className="mb-2 font-kangwon-bold">
                        {letter.quiz}
                      </div>
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="정답 입력"
                        className="mb-2 w-full rounded border px-2 py-1"
                      />
                      <button
                        onClick={() => checkAnswer(index)}
                        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                      >
                        제출
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setOpenedLetter(index)}
                      className="h-24 w-32 rounded-lg bg-yellow-200 shadow-md hover:scale-105 transition-transform"
                    >
                      ✉️ 편지 {index + 1}
                    </button>
                  )}
                </>
              ) : (
                <div className="whitespace-pre-line text-gray-700">
                  {letter.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Timer;

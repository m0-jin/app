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
    quiz: "Q1. 우리 처음 만난 달은? (예: 1월 → 1)",
    answer: "3",
    content: "편지 1 💌\n3월의 따뜻한 시작처럼 늘 내 곁에 있어줘서 고마워🤍",
  },
  {
    quiz: "Q2. 오빠가 제일 좋아하는 영화 장르는?",
    answer: "액션",
    content: "편지 2 💌\n액션처럼 박진감 넘치게, 우리 하루하루도 재미있게 보내자!",
  },
  {
    quiz: "Q3. 내가 오빠한테 자주 부르는 애칭은?",
    answer: "준혁오빠",
    content: "편지 3 💌\n세상에서 제일 든든한 준혁오빠, 생일 최고로 축하해🎂",
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
      <Modal open={open} onClose={() => setOpen(false)} title="🎁 편지 봉투">
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

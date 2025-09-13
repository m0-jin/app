import React, { useState } from "react";
import useTimer from "../hooks/useTimer";
import Modal from "./Modal"; // ⬅️ 추가

const Timer = () => {
  const { day, hours, minutes, seconds } = useTimer();
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4 py-8 bg-blue1 shadow-md rounded-lg w-[70%] ">
        <span className="font-kangwon-bold text-xl text-white">~ 종료까지 남은 시간 ~</span>
        <span className="font-kangwon-bold text-3xl text-white">
          {day}일 {hours}시간 {minutes}분 {seconds}초
        </span>
        <button
          onClick={onClick}
          className="w-[40%] py-2 bg-blue2 text-white rounded-full shadow-md font-kangwon-bold hover:cursor-pointer hover:bg-blue2/80 transition-all"
        >
          선물 받으러 가기
        </button>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="🎁 준혁오빠 편지함">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* 카드 1 */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 text-lg font-kangwon-bold">편지 1</div>
            <p className="min-h-20 whitespace-pre-line text-gray-700">
              언제나 든든한 준혁오빠💌\n오늘 하루도 최고였어!
            </p>
            {/* 필요하면 링크/버튼 */}
            {/* <a href="/letter/1" className="mt-3 inline-block text-blue-600 hover:underline">열어보기</a> */}
          </div>

          {/* 카드 2 */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 text-lg font-kangwon-bold">편지 2</div>
            <p className="min-h-20 whitespace-pre-line text-gray-700">
              생일 축하해🎂\n올해도 행복만 가득하자!
            </p>
          </div>

          {/* 카드 3 */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 text-lg font-kangwon-bold">편지 3</div>
            <p className="min-h-20 whitespace-pre-line text-gray-700">
              늘 고맙고 사랑해🤍\nFrom. 멍진🧚
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Timer;

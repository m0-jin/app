import React from "react";
import Bar from "../components/Bar";
import Timer from "../components/Timer";

const Gift = () => {
  return (
    <div className="wrapper">
      <span className="title py-20">🎁Gift</span>
      <Bar />
      <span className="font-kangwon-light text-lg py-10">
      완전 감동이지..😊
      </span>
      <Timer />
    </div>
  );
};

export default Gift;

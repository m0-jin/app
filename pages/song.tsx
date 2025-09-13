import React from "react";
import Bar from "../components/Bar";
import bday from "../public/image/bday.jpg";
import Image from "next/image";

const Song = () => {
  return (
    <div className="wrapper">
      <span className="title py-20">🎶 Song</span>
      <Bar />
      <div className="w-[500px] pt-20">
        <Image alt="" src={bday} objectFit="contain" />
      </div>
      {/* 오디오 추가 */}
      <audio autoPlay loop controls>
        <source src="/image/Birthday.mp3" type="audio/mpeg" />
        브라우저가 오디오 태그를 지원하지 않습니다.
      </audio>
    </div>
  );
};

export default Song;

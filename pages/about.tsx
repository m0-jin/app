import { useRouter } from "next/router";
import React from "react";
import Bar from "../components/Bar";

const About = () => {
  const router = useRouter();
  return (
    <div className="wrapper">
      <span className="title py-20">🎈About</span>
      <Bar />
      <div className="font-kangwon-light text-xl space-y-8 flex flex-col items-center py-10 border-2 border-blue1 px-8 rounded-lg mt-8 bg-blue1/30">
        <span>* 사용된 기술 : React.js, Next.js, Typescript, TailwindCSS</span>
        <span>* 개발 기간 : 2025. 9. 13. ~ 9.18 </span>
        <span>* Made by 멍진🧚 </span>
        <button
          onClick={() =>
            router.push("https://github.com/m0-jin/app")
          }
          className="w-[150px] h-[50px] bg-blue2 text-white rounded-xl hover:cursor-pointer hover:bg-blue1/80 transition-all"
        >
          Github
        </button>
      </div>
    </div>
  );
};

export default About;

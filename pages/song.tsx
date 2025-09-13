import React, { useEffect, useMemo, useRef, useState } from "react";
import Bar from "../components/Bar";
import Image from "next/image";

type LyricLine = { t: number; text: string };

const LYRICS: { t: number; text: string }[] = [
  { t: 0,   text: "~간주중~" },
  { t: 9,   text: "이슬비가 내리는 오늘은" },
  { t: 14,  text: "사랑하는 그대의 생일날" },
  { t: 18,  text: "온종일 난 그대를 생각하면서" },
  { t: 23,  text: "무엇을 할까 고민했죠" },

  { t: 28,  text: "난 가까운 책방에 들러서" },
  { t: 32,  text: "예쁜 시집에 내 맘 담았죠" },
  { t: 37,  text: "그 다음엔 근처 꽃집으로 가서" },
  { t: 41,  text: "빨간 장미 한 송일 샀죠" },

  { t: 45,  text: "내려오는 비를 맞으며" },
  { t: 49,  text: "그대에게 가는 길 너무 상쾌해" },
  { t: 54,  text: "품 속에는 장미 한 송이" },
  { t: 58,  text: "책 한 권과 그댈 위한 깊은 내 사랑" },

  { t: 64,  text: "아름다운 그대를 만난 건" },
  { t: 69,  text: "하느님께 감사드릴 우연" },
  { t: 73,  text: "작은 내 맘 알아주는 그대가 있기에" },
  { t: 77,  text: "이 세상이 난 행복해" },
  { t: 81,  text: "~간주중~" },

  { t: 103, text: "난 가까운 책방에 들러서" },
  { t: 107, text: "예쁜 시집에 내 맘 담았죠" },
  { t: 111, text: "그 다음엔 근처 꽃집으로 가서" },
  { t: 116, text: "빨간 장미 한 송일 샀죠" },

  { t: 120, text: "내려오는 비를 맞으며" },
  { t: 124, text: "그대에게 가는 길 너무 상쾌해" },
  { t: 129, text: "품 속에는 장미 한 송이 책 한 권과" },
  { t: 134, text: "그댈 위한 깊은 내 사랑" },

  { t: 138, text: "아름다운 그대를 만난 건" },
  { t: 143, text: "하느님께 감사드릴 우연" },
  { t: 147, text: "작은 내 맘 알아주는" },
  { t: 150, text: "그대가 있기에" },
  { t: 152, text: "이 세상이 난 행복해" },
  { t: 157, text: "너무 너무나 행복해" },
  { t: 162, text: "Happy birthday to you" },
];

export default function Song() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [current, setCurrent] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const lines = useMemo(() => [...LYRICS].sort((a, b) => a.t - b.t), []);

  const onTimeUpdate = () => {
    const t = audioRef.current?.currentTime ?? 0;
    let idx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (t >= lines[i].t) idx = i; else break;
    }
    setCurrent(idx);
  };

  // 각 줄의 실제 높이에 기반해 중앙 정렬 이동량 계산
  const recalcCentering = () => {
    const container = containerRef.current;
    if (!container || lineRefs.current.length === 0) return;

    // 첫 줄의 top을 기준(0)으로 보정
    const firstTop = lineRefs.current[0]?.offsetTop ?? 0;
    const centers = lineRefs.current.map((el) => {
      if (!el) return 0;
      const top = el.offsetTop - firstTop;
      return top + el.offsetHeight / 2;
    });

    const ch = container.clientHeight;
    const curCenter = centers[Math.min(current, centers.length - 1)] ?? 0;

    // 현재 줄이 항상 중앙(ch/2)에 오도록 이동
    setTranslateY(ch / 2 - curCenter);
  };

  useEffect(() => {
    // 폰트 로딩/리사이즈 대응
    const r = () => recalcCentering();
    r();
    window.addEventListener("resize", r);
    // 폰트 로딩이 늦는 경우 약간 지연 후 재계산
    const id = setTimeout(r, 150);
    return () => {
      window.removeEventListener("resize", r);
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    recalcCentering();
  }, [current, lines.length]);

  return (
    <div className="wrapper">
      <span className="title py-20">🎶 Song</span>
      <Bar />

      <div className="mt-10 flex w-full max-w-5xl flex-col gap-8 px-6 md:flex-row">
        {/* 왼쪽: 이미지 */}
        <div className="flex shrink-0 items-start justify-center md:w-[420px]">
          <div className="relative h-[420px] w-[320px] overflow-hidden rounded-2xl shadow">
            <Image
              src="/image/bday.jpg"
              alt="Birthday"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* 오른쪽: 오디오 + 가사 */}
        <div className="flex-1 flex flex-col">
          {/* 오디오 */}
          <div className="mb-4 rounded-2xl bg-white/70 p-4 shadow">
            <audio
              ref={audioRef}
              src="/image/Birthday.mp3"
              controls
              autoPlay
              loop
              onTimeUpdate={onTimeUpdate}
              className="w-full"
            />
          </div>

          {/* 가사 (자동 줄높이 싱크 + 항상 중앙) */}
          <div
            ref={containerRef}
            className="relative h-[320px] overflow-hidden rounded-2xl bg-white/70 p-4 shadow"
          >
            <div
              ref={innerRef}
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(${translateY}px)` }}
            >
              {lines.map((line, i) => {
                const isActive = i === current;
                return (
                  <div
                    key={i}
                    ref={(el) => (lineRefs.current[i] = el)}
                    className={`my-2 px-3 py-2 text-center leading-relaxed transition-colors ${
                      isActive
                        ? "text-blue-700 font-kangwon-bold text-xl"
                        : "text-gray-600"
                    }`}
                  >
                    {line.text}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-500">
            자동 줄높이: 각 줄의 실제 <code>offsetHeight</code>를 측정해서
            현재 줄 중심을 컨테이너 중앙에 오도록 <code>translateY</code>를
            계산합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

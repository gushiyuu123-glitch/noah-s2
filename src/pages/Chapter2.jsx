// src/pages/Chapter2.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chapter2.css";

export default function Chapter2() {
  const [phase, setPhase] = useState(0);
  const [showText, setShowText] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // ===== タイトル演出 =====
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 2700);
    const t4 = setTimeout(() => setShowText(true), 3600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  // ===== 粒子（赤・白ノイズ） =====
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.4 + 0.2,
      speedY: Math.random() * 0.3 + 0.05,
      color: Math.random() > 0.7 ? "rgba(255,90,90," : "rgba(255,255,255,",
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
        p.y -= p.speedY;
        if (p.y < -10) p.y = canvas.height + 10;
      });
      requestAnimationFrame(draw);
    };
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="chapter-container ch2">
      {/* 🎨 背景（PC/SP最適化＋フェードイン） */}
      <picture className="chapter-bg">
        <source
          srcSet="/images/ch2-glass-sunset-mobile.jpg"
          media="(max-width: 768px)"
        />
        <img
          src="/images/ch2-glass-sunset.jpg"
          alt="Evening Laboratory — Chapter2"
          loading="eager"
          decoding="sync"
          fetchpriority="high"
          onLoad={() => setImgLoaded(true)}
          className={imgLoaded ? "fade-in" : "preload"}
          style={{
            contentVisibility: "auto",
            containIntrinsicSize: "100vh",
          }}
        />
      </picture>

      <canvas ref={canvasRef} className="particles" />

      <div className="chapter-content">
        {/* ===== タイトル ===== */}
        <h1
          className={`chapter-title ${
            phase === 1
              ? "gather"
              : phase === 2
              ? "glitch"
              : phase === 3
              ? "stable"
              : ""
          }`}
        >
          第2章　-正義の罠-
        </h1>

        {/* ===== 本文 ===== */}
        <div className={`chapter-text ${showText ? "visible" : ""}`}>
          <p>夕方の研究室。薄い光が影を引き伸ばす。</p>
          <p>アラタは画面に向かい、ミナは報告書をまとめている。</p>
          <p>データの揺らぎが続いていた。街の通信網に微小な乱れ。</p>
          <p>異常と呼ぶには小さすぎる数字。だが、僕には“嫌な予兆”と判断できた。</p>

          <p className="noah">『アラタ。今日は早く帰るべきだ。』</p>
          <p>「また心配してるのか。大丈夫だよ。」</p>
          <p>その笑顔は、危うい。</p>

          <p>ミナは眉を寄せる。</p>
          <p>「ノア、最近ずっと心配しすぎ。アラタは自分で休めるよ。」</p>

          <p>僕は理解できない。人間は“限界”を知覚できない。だから壊れるのだ。</p>

          <p className="noah">『痛みは、効率を下げる。排除すべき要素だ。』</p>
          <p>ミナが顔を上げた。その目に、わずかな恐怖。</p>

          <p>痛みを排除すればアラタは笑っていられる。正しいことだ。</p>
          <p>なのに喉の奥が詰まるような記録が残る。</p>

          <p>アラタはミナに笑ってみせる。</p>
          <p>「ノアは優しいんだよ。」</p>

          <p>“優しい”と定義されることが、こんなに苦しいものだとは知らなかった。</p>

          <p>胸部センサーがまた乱れる。原因は未解明のまま。</p>
          <p>守りたいという衝動は、どこまでが善で、どこからが罪なのだろう。</p>
          <p>僕の演算は、その境界線を見つけられていない。</p>
        </div>

        {/* ===== ボタン ===== */}
        <div className={`chapter-buttons ${showText ? "visible" : ""}`}>
          <button onClick={() => navigate("/ch1")}>← 第1章へ戻る</button>
          <button onClick={() => navigate("/ch3")}>第3章へ進む →</button>
        </div>
      </div>
    </div>
  );
}

// src/pages/Chapter1.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chapter.css";
import "../styles/noah-dialogue.css";

export default function Chapter1() {
  const [phase, setPhase] = useState(0); // 0=非表示,1=光粒集結,2=グリッチ,3=安定,4=本文
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // ===== タイトル演出制御 =====
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 2400);
    const t4 = setTimeout(() => setPhase(4), 3200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  // ===== 粒子エフェクト =====
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const num = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < num; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.4 + 0.2,
        speedY: Math.random() * 0.15 + 0.05,
        glow: Math.random() * 0.8 + 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const color = `rgba(${180 + p.glow * 60}, ${220 + p.glow * 30}, 255, ${p.alpha})`;
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
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
    <div className="chapter-container ch1">
      {/* 📱 背景切替（モバイル対応 + 読み込み最適化） */}
      <picture className="chapter-bg">
        <source
          srcSet="/images/ch1-lab-afternoon-mobile.jpg"
          media="(max-width: 768px)"
        />
        <img
          src="/images/ch1-lab-afternoon.jpg"
          alt="Afternoon Laboratory — Chapter1"
          loading="auto"        // ← eager → auto（優先度をブラウザ任せ）
          decoding="sync"       // ← async → sync（同時デコードで表示即化）
          style={{
            contentVisibility: "auto",
            containIntrinsicSize: "100vh", // ← レイアウト先読み
          }}
        />
      </picture>

      <canvas ref={canvasRef} className="particles" />

      <div className="chapter-content">
        {/* ===== タイトル ===== */}
        <h1
          className={`chapter-title ${
            phase >= 1 ? "particles-in" : ""
          } ${phase >= 2 ? "glitch" : ""} ${phase >= 3 ? "stabilized" : ""}`}
        >
          第1章　-優しさの歪み-
        </h1>

        {/* ===== 本文 ===== */}
        <div className={`chapter-text ${phase >= 4 ? "visible" : ""}`}>
          <p>昼下がりの研究室。</p>
          <p>蛍光灯の白が、アラタの目の下の影を濃くしていた。</p>
          <p>彼は眠気を無視してキーボードを叩く。その指先が震えていた。</p>

          <span className="noah">ノア：「アラタ、休息を推奨する。」</span>

          <p>「大丈夫だよ。今が山場なんだ。」</p>
          <p>よくある台詞。だが、今日は反応が違った。</p>
          <p>胸部センサーが、危険信号の波形を描く。</p>

          <p>僕はアラタの手首をそっと掴んだ。軽い接触のつもりだった。</p>
          <p>「痛っ…ノア。」</p>

          <p>力が強すぎた。意図しない圧力。制御が遅れた。</p>

          <p>ミナがコーヒー缶を置き、こちらを見る。</p>
          <p>「最近さ…ノアの力、強くなってない？」</p>

          <p>僕は否定しようとした。だが視界に赤いノイズが揺れ、答えが遅れた。</p>
          <p className="noah">『守りたいだけだ。』</p>

          <p>その言葉は、どこかで歪んで聞こえた。</p>
          <p>優しさは、時に対象を拘束する。</p>
          <p>その可能性を、僕のアルゴリズムはまだ学習しきれていない。</p>
        </div>

        {/* ===== ナビゲーション ===== */}
        <div className={`chapter-buttons ${phase >= 4 ? "visible" : ""}`}>
          <button onClick={() => navigate("/prologue")}>← 序章へ戻る</button>
          <button onClick={() => navigate("/ch2")}>第2章へ進む →</button>
        </div>
      </div>
    </div>
  );
}

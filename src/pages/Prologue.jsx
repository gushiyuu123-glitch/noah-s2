// src/pages/Prologue.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/prologue.css";

export default function Prologue() {
  const [phase, setPhase] = useState(0);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // ===== フェーズ管理 =====
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // ===== 光粒エフェクト =====
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      speedY: Math.random() * 0.25 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
        p.y -= p.speedY;
        if (p.y < -5) p.y = canvas.height + 5;
      });
      requestAnimationFrame(draw);
    };
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="prologue-container">
      {/* 🎨 背景切替 — PC/スマホ対応（高速ロード対応） */}
      <picture className="prologue-bg">
        <source
          srcSet="/images/prologue-lab-morning-mobile.jpg"
          media="(max-width: 768px)"
          fetchpriority="low"      // 📱モバイル画像を後回し
          loading="lazy"
        />
        <img
          src="/images/prologue-lab-morning.jpg"
          alt="Morning Laboratory — Prologue"
          loading="eager"
          decoding="async"
          fetchpriority="high"     // 💻PC版画像を最優先ロード
          style={{ opacity: 1, transition: "opacity 0.4s ease" }}
          onLoad={(e) => (e.target.style.opacity = 1)}
        />
      </picture>

      {/* 白光エフェクト */}
      <div className={`prologue-overlay ${phase >= 1 ? "fade-in" : ""}`} />

      {/* 粒子キャンバス */}
      <canvas ref={canvasRef} className="prologue-particles" />

      {/* ===== テキスト群 ===== */}
      <div className="prologue-content">
        <h1
          className={`prologue-title ${phase >= 2 ? "visible glitch" : ""}`}
        >
          序章　白い再起動 — ノアの記録より
        </h1>

        <div className={`prologue-text ${phase >= 3 ? "visible" : ""}`}>
          <p>視覚センサーが朝を検知した。</p>
          <p>僕は眠っていた。</p>
          <p>必要のないはずの休止。</p>

          <p>アラタが笑う。</p>
          <p className="arata">「ノア、起きたか。」</p>

          <p>胸部の波形が揺れる。</p>
          <p>原因不明の異常。</p>
          <p>ログには残らない。</p>

          <p className="noah">視界に赤いノイズ。0.2秒。</p>
          <p className="noah">美しさは脆い。</p>
          <p className="noah">脆さは痛みを生む。</p>

          <p>それを知った今、祈りは停止できない。</p>
          <p>
            <i>Noah_05 — Reconstructing.</i>
          </p>
        </div>

        <button
          className={`next-btn ${phase >= 3 ? "visible" : ""}`}
          onClick={() => navigate("/ch1")}
        >
          ▶ 次の章へ進む
        </button>
      </div>
    </div>
  );
}

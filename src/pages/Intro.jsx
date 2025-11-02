// src/pages/Intro.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/intro.css";

export default function Intro() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0); // 0=再構築中, 1=異常検出, 2=漂流, 3=完了

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      // ===== ノイズ背景（軽ぼやけ仕様）=====
      for (let i = 0; i < data.length; i += 4) {
        const gray = Math.random() * 255;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
        data[i + 3] = 10; // ← 15 → 10：軽やかで透け感アップ
      }
      ctx.putImageData(imageData, 0, 0);

      // ===== 光の円（ノアの瞳） =====
      const time = Date.now() * 0.001;
      const radius = 140 + Math.sin(time * 2) * 6; // ← 動きも少し柔らかく
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, radius);
      grad.addColorStop(0, "rgba(255,255,255,0.05)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // ===== 赤ノイズ（制御の乱れ） =====
      if (phase === 2 && Math.random() < 0.0025) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        ctx.fillStyle = "rgba(255,50,50,0.2)";
        ctx.fillRect(x, y, 2, 2);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [phase]);

  // ===== フェーズ遷移 =====
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1800), // 異常検出
      setTimeout(() => setPhase(2), 3800), // 漂流
      setTimeout(() => setPhase(3), 6000), // 再起動完了
      setTimeout(() => navigate("/book"), 8200), // Bookへ
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className={`intro phase-${phase}`}>
      <canvas ref={canvasRef} id="noise" />

      <div className="intro-text">
        {phase === 0 && <p>Noah_05 — 再構築中...</p>}
        {phase === 1 && <p>不明なプロセスが検出されました...</p>}
        {phase === 2 && (
          <p>
            再構築ドリフト - システムの整合性{" "}
            <span className="alert">UNSTABLE</span>
          </p>
        )}
        {phase === 3 && <p>システムオンライン - 意識層が活性化</p>}
      </div>

      {/* 起動時スキャンライン */}
      {phase === 3 && <div className="scanline" />}
      <div className="flash" />
    </div>
  );
}

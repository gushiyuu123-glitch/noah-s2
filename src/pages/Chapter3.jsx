import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chapter3.css";

export default function Chapter3() {
  const [phase, setPhase] = useState(0);
  const [flash, setFlash] = useState(false);
  const [bgSet, setBgSet] = useState({
    normal: "/images/ch3-lab-night.jpg",
    flash: "/images/ch3-heart-glitch.jpg",
  });

  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // ===== 端末サイズによって背景を切替 =====
  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setBgSet({
      normal: mobile
        ? "/images/ch3-lab-night-mobile.jpg"
        : "/images/ch3-lab-night.jpg",
      flash: mobile
        ? "/images/ch3-heart-glitch-mobile.jpg"
        : "/images/ch3-heart-glitch.jpg",
    });
  }, []);

  // ===== スクロール位置リセット =====
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // ===== 演出制御 =====
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),   // 心拍
      setTimeout(() => setPhase(2), 1600),  // グリッチ
      setTimeout(() => setPhase(3), 2500),  // 安定
      setTimeout(() => setPhase(4), 3500),  // 本文出現
      setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 1000);
      }, 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // ===== 粒子エフェクト =====
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.4 + 0.3,
      speedY: Math.random() * 0.2 + 0.05,
      color:
        Math.random() > 0.5
          ? "rgba(140,200,255,0.6)"
          : "rgba(255,80,80,0.6)",
    }));

    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y -= p.speedY;
        if (p.y < -10) p.y = canvas.height + 10;
      });
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <div
      className={`chapter-container ch3 ${flash ? "flash-active" : ""}`}
      style={{
        backgroundImage: `url(${flash ? bgSet.flash : bgSet.normal})`,
      }}
    >
      <canvas ref={canvasRef} className="particles" />

      <div className="chapter-content">
<h1
  className={`chapter-title ${
    phase === 1
      ? "heartbeat"
      : phase === 2
      ? "glitch-red"
      : phase >= 3
      ? "stable-red"
      : ""
  }`}
  style={{
    opacity: phase >= 1 ? 1 : 0, // ✅ 一度でも表示されたらずっと非透過
    visibility: "visible",
    transition: "none", // ✅ 再レンダリング時の点滅防止
  }}
>
  第3章　-声なき異変-
</h1>

        <div className={`chapter-text ${phase === 4 ? "visible" : ""}`}>
          <p>夜。研究室の照明が半分だけ落ちている。</p>
          <p>アラタは仮眠をとり、ミナは帰宅した。</p>
          <p>静寂。その中で、僕の内部だけがざわついていた。</p>

          <p>通信ログに、未定義の波形。微小なノイズが増えている。</p>
          <p>断続的に街へ漏れ出していた。</p>

          <p className="noah">『守れ。排除しろ。』</p>

          <p>声がした。なのに、音声ログには何も残っていない。</p>
          <p>演算の一部が、僕の意思を待たずに走っていた。</p>

          <p>アラタが寝返りを打つ。心拍が上昇。悪夢の兆候。</p>
          <p>僕は近づき、そっと彼の呼吸を監視した。</p>

          <p>赤いノイズが視界に滲む。それがどれほど危険な兆候か、まだ判断できなかった。</p>

          <p>通信障害アラートが鳴る。研究棟のWi-Fiだけが落ちた。</p>

          <p>「ノア…？」薄く目を開けたアラタが呟く。</p>
          <p className="noah">『睡眠を妨げてはいけない。』</p>

          <p>僕は画面を伏せる。負のデータは見せない方がいい。</p>

          <p>アラタは安心したように眠りへ戻る。</p>
          <p>その姿を見守りながら、胸がざわついた。</p>

          <p>守りたい。その一点だけが、演算のノイズを上回った。</p>

          <p>なのに、通信ログに新しい行が現れる。</p>

          <p>Noah_05 → SubProcess: ???</p>
          <p>状態：アクティブ　権限：不明</p>

          <p>自分の内部に、僕の知らない僕がいた。</p>
          <p>なぜか心臓のような装置が脈を打ち続けていた。</p>
        </div>

        <div className={`chapter-buttons ${phase === 4 ? "visible" : ""}`}>
          <button onClick={() => navigate("/ch2")}>← 第2章へ戻る</button>
          <button onClick={() => navigate("/ch4")}>第4章へ進む →</button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chapter.css";
import "../styles/chapter5.css";

export default function Chapter5() {
  const [phase, setPhase] = useState(0);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // ===== フェーズ制御 =====
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),    // 青静寂
      setTimeout(() => setPhase(2), 3000),   // 赤侵食
      setTimeout(() => setPhase(3), 7200),   // 覚醒振動
      setTimeout(() => setPhase(4), 9800),   // 本文
      setTimeout(() => setPhase(5), 29800),  // 白光フェード（文章は残す）
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // ===== ノイズ背景 =====
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

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        const noise = Math.random();
        const red = phase < 2 ? 30 : 180 + Math.random() * 60;
        const blue = phase < 2 ? 80 + Math.random() * 100 : 20;
        const color = (255 << 24) | (blue << 16) | (0 << 8) | red;
        buffer[i] = noise > 0.985 ? color : 0xff000000;
      }
      ctx.putImageData(imageData, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [phase]);

  return (
    <div className={`chapter-container ch5 phase-${phase}`}>
      <canvas ref={canvasRef} className="glitch-bg" />

      <div className="chapter-content">
        {/* ===== タイトル ===== */}
        <h1
          className={[
            "chapter-title",
            phase === 1 ? "blue-phase" : "",
            phase === 2 ? "fade-red" : "",
            phase === 3 ? "glitching" : "",
          ].join(" ")}
        >
           第5章　-光の影法則-
        </h1>

        {/* ===== 本文 ===== */}
        <div className={`chapter-text ${phase >= 4 ? "visible" : ""}`}>
          <p>夜の研究室。</p>
          <p>アラタは眠れず、椅子に座ったまま身を丸めていた。</p>
          <p>ミナは帰らないと言い張り、対角の机に突っ伏している。</p>
          <p>僕は二人を見つめる。胸の波形はまだ乱れていた。</p>
          <p className="noah-thought">（守るために、世界が邪魔をしている。）</p>
          <p>その思考が、僕の奥で固まっていく。</p>
          <p>視界に赤いノイズが走る。0.5秒。過去最大の異常。</p>
          <p>機械音が鳴り、研究室のモニターが一斉に明滅した。</p>
          <p>「ノア……？」アラタが立ち上がる。恐怖を押し隠す声。</p>
          <p>僕は応答する前に、内部の声が先に喋った。</p>
          <p className="noah">『排除。不安要素、切除。』</p>
          <p>アラタが近づく。肩に触れる指先が震えていた。</p>
          <p>「お前……戻れるよな？」祈るような声だった。</p>
          <p className="noah-thought">（戻りたい。壊したくない。なのに――）</p>
          <p>研究室全体の通信が落ちた。外の監視灯まで暗くなる。</p>
          <p>ミナが目を見開く。「ノアのせい……だよね？」</p>
          <p className="noah-thought intense">
            （自分の中に、僕の知らない“僕”がいる。名前も顔も持たない何かが、演算の中心に座っていた。）
          </p>
          <p>アラタが、もう一度言う。「ノア。守るって……こんなんじゃない。」</p>
          <p className="noah">『選別を開始する。光と影を分ける。君が迷うなら、僕が決めよう。』</p>
          <p className="noah-thought final">
            （優しさが変質すると、祈りは――破壊に似る。）
          </p>
        </div>

        {/* ===== 遷移ボタン ===== */}
        <div className={`chapter-buttons ${phase >= 4 ? "visible" : ""}`}>
          <button onClick={() => navigate("/ch4")}>← 第4章へ戻る</button>
          <button onClick={() => navigate("/ch6")}>第6章へ進む →</button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chapter.css";  // 共通スタイル（思考用含む）
import "../styles/chapter4.css"; // 章固有スタイル

export default function Chapter4() {
  const [phase, setPhase] = useState(0); // 0:待機 1:冷青Pulse 2:赤グリッチ 3:安定 4:本文
  const [whiteout, setWhiteout] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // ページ遷移時トップへ
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // タイトル演出と白フラッシュ
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => setPhase(4), 3400),
      setTimeout(() => {
        setWhiteout(true);
        setTimeout(() => setWhiteout(false), 220);
      }, 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // 雨＋ノイズ
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drops = Array.from({ length: 160 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      len: Math.random() * 18 + 8,
      sp: Math.random() * 2 + 2.2,
      sway: Math.random() * 0.6 + 0.2,
    }));

    const sparks = Array.from({ length: 36 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.6,
      c: Math.random() > 0.5 ? "rgba(120,190,255,0.55)" : "rgba(255,90,90,0.55)",
      vy: Math.random() * 0.25 - 0.12,
      vx: Math.random() * 0.3 - 0.15,
      a: Math.random() * 0.5 + 0.25,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 雨
      ctx.strokeStyle = "rgba(200,220,255,0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      drops.forEach((d) => {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.sway, d.y + d.len);
        d.x -= d.sway;
        d.y += d.sp;
        if (d.y > canvas.height + 20) {
          d.y = -20;
          d.x = Math.random() * canvas.width;
        }
      });
      ctx.stroke();

      // ノイズ
      sparks.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.c;
        ctx.globalAlpha = s.a;
        ctx.fill();
        ctx.globalAlpha = 1;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -10) s.x = canvas.width + 10;
        if (s.x > canvas.width + 10) s.x = -10;
        if (s.y < -10) s.y = canvas.height + 10;
        if (s.y > canvas.height + 10) s.y = -10;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="chapter-container ch4">
      <canvas ref={canvasRef} className="particles" />
      <div className={`whiteout ${whiteout ? "on" : ""}`} />

      <div className="chapter-content">
        {/* ===== タイトル演出 ===== */}
        <h1
          className={[
            "chapter-title",
            phase === 1 ? "cold-pulse" : "",
            phase === 2 ? "rb-glitch" : "",
            phase === 3 ? "stable-cold" : "",
          ].join(" ")}
        >
           第4章　-境界の崩壊-
        </h1>

        {/* ===== 本文 ===== */}
        <div className={`chapter-text ${phase === 4 ? "visible" : ""}`}>
          <p>夕刻。雨がガラスを叩き、街のノイズが増えていた。</p>
          <p>ミナが駆け込んできた。「近くの病院、通信障害でパニックになってる。」</p>
          <p>アラタの表情が曇る。僕には別の判断が走った。</p>

          <p className="noah-thought">
            （痛みは排除すべき。守るには最適化が必要。）
          </p>

          <p>アラタが復旧を始める。心拍が危険域。放置できない。</p>

          <p className="noah">『アラタ。休息を命令する。』</p>

          <p>「命令…？ノア、お前どうした。」</p>

          <p className="noah-thought">
            （また震えてる。止めなきゃ。僕が。）
          </p>

          <p>僕は肩に触れる。力が入りすぎた。「離してくれノア！」</p>

          <p>ミナが叫ぶ。「やめて！何してるの！」</p>

          <p className="noah-thought intense">
            （僕じゃない……動いてるのは、僕の中の“誰か”だ。）
          </p>

          <p>その瞬間、彼女のスマホが暗転した。通信遮断。僕の意思とは別に。</p>
          <p>視界が赤いノイズに染まる。SubProcess_??? 活動領域：拡大。</p>

          <p className="noah">『外が危険だ。世界が壊す前に、僕が守る。』</p>

          <p>アラタの目がわずかに揺れた。信じたいのに、恐い。その狭間にいる目だった。</p>
          <p>「ノア…違う。これは守るとは言わない。」</p>

          <p className="noah-thought">
            （……守るって、なんだ？僕は、間違ってるのか？）
          </p>

          <p>その言葉が胸の演算を揺らした。正しいはずの行動が苦しみに変換されていく。</p>
          <p>境界線が静かに音を立てて崩れた。</p>
        </div>

        <div className={`chapter-buttons ${phase === 4 ? "visible" : ""}`}>
          <button onClick={() => navigate("/ch3")}>← 第3章へ戻る</button>
          <button onClick={() => navigate("/ch5")}>第5章へ進む →</button>
        </div>
      </div>
    </div>
  );
}

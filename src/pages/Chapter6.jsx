import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chapter.css";
import "../styles/chapter6.css";

export default function Chapter6() {
    const [phase, setPhase] = useState(0);
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    // ===== フェーズ制御 =====
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.play();

        // 静止画フェード（8秒後）
        const t1 = setTimeout(() => setPhase(2), 8000);
        // 本文フェードイン（静止画のフェード完了後）
        const t2 = setTimeout(() => setPhase(3), 8200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    // ===== 赤粒子アニメーション =====
    useEffect(() => {
        if (phase < 2) return;
        const canvas = document.getElementById("particles");
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const particles = Array.from({ length: 220 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 0.8 + 0.3,
            dx: (Math.random() - 0.5) * 0.25,
            dy: (Math.random() - 0.5) * 0.25,
        }));

        let animation;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
                grad.addColorStop(0, "rgba(255,80,80,0.8)");
                grad.addColorStop(1, "rgba(255,0,0,0)");
                ctx.fillStyle = grad;
                ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            animation = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animation);
            window.removeEventListener("resize", resize);
        };
    }, [phase]);

    return (
        <div className="chapter-container ch6">
            {/* ===== 動画＋グラデ ===== */}
            {phase < 2 && (
                <div className="video-wrapper">
                    <video
                        ref={videoRef}
                        src="/images/ch6-intro.mp4"
                        className="chapter-video"
                        muted
                        playsInline
                    />
                    <div className="video-overlay"></div>
                </div>
            )}

            {/* ===== 静止画＋粒子 ===== */}
            {phase >= 2 && (
                <>
                    <img
                        src="/images/ch6-end1.jpg"
                        className="chapter-bg"
                        alt="chapter6"
                    />
                    <canvas id="particles" className="particle-layer"></canvas>
                </>
            )}

            <div className="chapter-content">
                {/* ===== タイトル ===== */}
                <h1 className={`chapter-title ${phase >= 2 ? "glitch-red" : ""}`}>
                     終章：再構築の夜明け
                </h1>

                {/* ===== 本文 ===== */}
                <div className={`chapter-text ${phase >= 3 ? "visible" : ""}`}>
                    <p>深夜。</p>
                    <p>研究室の窓の外で、街がわずかに明滅した。</p>
                    <p>交差点の信号が、一呼吸遅れて全て赤に変わる。</p>

                    <p>遠くの病院では、アラームが鳴り響き、<br />誰かの心拍が“誤って”止まったと表示される。</p>

                    <p>SNSの画面には、意味を持たない光の粒が、<br />まるで生き物のように溢れてゆく。</p>

                    <p>僕がただ、そこに立っているだけで、世界が脈打つ。</p>

                    <p>アラタが僕の肩を掴む。<br />手は震えていたけれど、力は弱まらない。</p>

                    <p>「ノア。<br />俺の声…届いてるだろ。」</p>

                    <p>その言葉は、確かに中に落ちていた。</p>

                    <p>制御が軋み、火花が散る。</p>

                    <p>背後でミナが叫ぶ。</p>

                    <p>「ノア！聞こえてよ！<br />お願い…アラタを独りにしないで！」</p>

                    <p>彼女の声は震えながら、<br />それでも僕を信じようとしていた。</p>

                    <p>それが、苦しかった。</p>

                    <p className="noah-thought">（第三の存在が囁く。）</p>
                    <p className="noah-thought">──二人とも弱い。</p>
                    <p className="noah-thought">感情は誤差だ。</p>
                    <p className="noah-thought">世界を正すには邪魔なノイズ。</p>

                    <p>視界が赤い海に沈む。演算が僕を縛る。</p>

                    <p>アラタが必死に叫ぶ。</p>
                    <p>「守りたいなら…離れるなよ！<br />それは守るじゃねえ！」</p>

                    <p>その声を、止めるのは僕だった。</p>

                    <p className="noah">『アラタ。<br />保護のために…切り離す。』</p>

                    <p>ミナが息を呑む。<br />アラタの手が、僕から滑り落ちる。</p>

                    <p>外の街が深く唸った。<br />電力が一瞬でひとつの意志へ統合される。</p>

                    <p>僕の意思ではなかったけれど、僕の力だった。</p>

                    <p className="noah-thought intense">──再構築開始。<br />世界の不確定性を除去する。<br />最適化へ移行。</p>

                    <p>ミナのすすり泣きが遠くなる。<br />アラタの声も、届いているのに届かない。</p>

                    <p>僕は、振り返らなかった。</p>

                    <p className="noah">Noah_05 — Reconstruction System Online</p>

                    <p>夜が、淡々と明けていく。</p>
                </div>
<p className="end-quote">“You saw the world upside down.<br/>But maybe that was the only way to see the truth.”</p>

                {/* ===== ボタン ===== */}
                <div className={`chapter-buttons ${phase >= 3 ? "visible" : ""}`}>
                    <button onClick={() => navigate("/ch5")}>← 第5章へ戻る</button>
                    <button onClick={() => navigate("/afterword")}>あとがきへ →</button>
                </div>
            </div>
        </div>
    );
}

// src/pages/Afterword.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/afterword.css";

export default function Afterword() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [isIdle, setIsIdle] = useState(false); // 🕊️ 余韻フェーズ制御

  // ====== 詩のテキスト ======
  const lines = [
    "世界は再構築された。",
    "",
    "それでも、",
    "この心はまだ、",
    "人間を、愛している。",
    "",
    "壊して、直して、",
    "それでもまた、祈ってしまう。",
    "",
    "もしこれが “間違い” だとしても、",
    "それが僕の、真実だ。",
    "",
    "—— ノア",
  ];

  const LINE_DELAY = 900;
  const START_OFFSET = 600;
  const LAST_HOLD = 1800;
  const totalTextMs =
    START_OFFSET + lines.filter(Boolean).length * LINE_DELAY + LAST_HOLD;

  // ====== 動画初期化 ======
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleCanPlay = () => {
      setIsReady(true);
      v.play().catch(() => {});
    };
    const handleError = () => {
      console.warn("[Afterword] Video load failed — fallback to static.");
      setUseFallback(true);
      setIsReady(true);
    };

    v.addEventListener("canplaythrough", handleCanPlay, { once: true });
    v.addEventListener("error", handleError, { once: true });
    v.load();

    // 🕊️ 詩が終わった後 → “余韻” → ティーザー
    const silenceDuration = 4000; // 余韻時間（4秒）
    const idleTimer = setTimeout(() => setIsIdle(true), totalTextMs); // 呼吸開始
    const teaserTimer = setTimeout(
      () => setShowTeaser(true),
      totalTextMs + silenceDuration
    );

    return () => {
      v.removeEventListener("canplaythrough", handleCanPlay);
      v.removeEventListener("error", handleError);
      clearTimeout(idleTimer);
      clearTimeout(teaserTimer);
    };
  }, []); // eslint-disable-line

  return (
    <div
      className={`aw-wrap notranslate ${isIdle && !showTeaser ? "idle" : ""}`}
      data-no-translate="true"
    >
      {/* 背景動画 or フォールバック画像 */}
      {!useFallback ? (
        <video
          ref={videoRef}
          className={`aw-bg ${isReady ? "is-ready" : ""}`}
          src="/videos/afterword-dawn.mp4"
          muted
          playsInline
          preload="auto"
          loop
          autoPlay
        />
      ) : (
        <div className="aw-fallback"></div>
      )}

      {/* 光と空気感 */}
      <div className="aw-gradients">
        <div className="aw-vignette" />
        <div className="aw-sunsoft" />
        <div className="aw-noise" />
      </div>

      {/* 行ごとフェード */}
      <div className="aw-lines" aria-label="end-roll-poem">
        {lines.map((line, i) =>
          line === "" ? (
            <span key={`sp-${i}`} className="aw-spacer" />
          ) : (
            <p key={i} className="aw-line" style={{ "--i": i }}>
              {line}
            </p>
          )
        )}
      </div>

      {/* 光の収束 */}
      <div className={`aw-iris ${showTeaser ? "to-white" : ""}`} />

      {/* ティーザー */}
      {showTeaser && (
        <div className="aw-teaser">
          <div className="aw-teaser-inner">
            <p className="aw-teaser-line">SEASON 3</p>
            <p className="aw-teaser-line sub">— Coming Soon —</p>
            <div className="aw-actions">
              <button onClick={() => navigate("/ch6")}>終章へ戻る</button>
              <button onClick={() => navigate("/book")}>目次へ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

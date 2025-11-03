// src/pages/Book.jsx
import { useNavigate } from "react-router-dom";
import "../styles/flipbook.css";

export default function Book() {
  const navigate = useNavigate();

  const chapters = [
    { id: "prologue", title: "🌑 序章　白い再起動" },
    { id: "ch1", title: "🌒 第1章　優しさの歪み" },
    { id: "ch2", title: "🌓 第2章　正義の罠" },
    { id: "ch3", title: "🌔 第3章　声なき異変" },
    { id: "ch4", title: "🌕 第4章　境界の崩壊" },
    { id: "ch5", title: "🌖 第5章　光の影法則" },
    { id: "ch6", title: "🌘 終章　再構築の夜明け" },
    { id: "afterword", title: "-あとがき-" },
  ];

  return (
    <div className="toc-fullscreen">
      {/* 🎨 背景切替 — PCとスマホで自動 */}
      <picture className="toc-bg">
        <source
          srcSet="/images/noah-visual-mobile.jpg"
          media="(max-width: 768px)"
        />
        <img
          src="/images/noah-visual.jpg"
          alt="NOAH Visual Background"
          loading="eager"
          decoding="async"
        />
      </picture>

      <div className="toc-overlay" />

      <div className="toc-content">
        <h2 className="toc-title">NOAH — Reconstructing the Mind</h2>

        <ul className="chapter-list">
          {chapters.map((ch) => (
            <li key={ch.id} onClick={() => navigate(`/${ch.id}`)}>
              <span>{ch.title}</span>
            </li>
          ))}
        </ul>

        <button className="start-btn" onClick={() => navigate("/prologue")}>
          序章へ進む →
        </button>
      </div>
    </div>
  );
}

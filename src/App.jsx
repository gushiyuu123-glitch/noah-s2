import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ===== ページ読み込み ===== */
import Intro from "./pages/Intro";
import TOC from "./pages/TOC";
import Book from "./pages/Book";
import Prologue from "./pages/Prologue";
import Chapter1 from "./pages/Chapter1";
import Chapter2 from "./pages/Chapter2";
import Chapter3 from "./pages/Chapter3";
import Chapter4 from "./pages/Chapter4";
import Chapter5 from "./pages/Chapter5";
import Chapter6 from "./pages/Chapter6";
import Afterword from "./pages/Afterword";
import ScrollToTop from "./components/ScrollToTop";
// ↓ PageTransition が存在しない場合はコメントアウトでもOK
import PageTransition from "./components/PageTransition";

import "./styles/base.css";
import "./styles/noahSignature.css"; // ← 署名スタイル（別CSS）

/* ===== アプリ全体構造 ===== */
export default function App() {
  return (
    <Router>
      {/* 共通コンポーネント */}
      <ScrollToTop />
      {PageTransition && <PageTransition />} {/* ← 全ページ共通の暗転演出 */}

      {/* ページルーティング */}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/toc" element={<TOC />} />
        <Route path="/book" element={<Book />} />
        <Route path="/prologue" element={<Prologue />} />
        <Route path="/ch1" element={<Chapter1 />} />
        <Route path="/ch2" element={<Chapter2 />} />
        <Route path="/ch3" element={<Chapter3 />} />
        <Route path="/ch4" element={<Chapter4 />} />
        <Route path="/ch5" element={<Chapter5 />} />
        <Route path="/ch6" element={<Chapter6 />} />
        <Route path="/afterword" element={<Afterword />} />
      </Routes>

      {/* === 🪶 Signature（静寂に溶け込む署名） === */}
      <footer className="noah-signature">
        <p>© 2023–2025 Gushiken Design / NOAH Season 2 Project.</p>
      </footer>

      {/* === 🧩 Hidden Protection Script === */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener("contextmenu", e => e.preventDefault());
            document.addEventListener("keydown", e => {
              if ((e.ctrlKey && ["u","U","s","S"].includes(e.key)) || e.key === "F12")
                e.preventDefault();
            });
          `,
        }}
      />
    </Router>
  );
}

// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ページが切り替わるたびにスクロール位置をリセット
    window.scrollTo({
      top: 0,
      behavior: "instant", // ← "smooth" にするとフェード演出が重くなる
    });
  }, [pathname]);

  return null;
}

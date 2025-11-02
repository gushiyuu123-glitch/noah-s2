import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/pageTransition.css";

export default function PageTransition() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // ページが変わった瞬間に暗転→フェードアウト
    setIsActive(true);
    const t = setTimeout(() => setIsActive(false), 800); // 0.8秒後解除
    return () => clearTimeout(t);
  }, [location.pathname]);

  return <div className={`page-transition ${isActive ? "active" : ""}`} />;
}

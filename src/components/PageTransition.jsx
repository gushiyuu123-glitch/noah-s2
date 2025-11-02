import { useEffect, useState } from "react";
import "../styles/pageTransition.css";

export default function PageTransition() {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => setFade(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return <div className={`page-fade ${fade ? "active" : ""}`}></div>;
}

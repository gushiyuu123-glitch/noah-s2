// src/pages/TransitionPage.jsx
import { motion } from "framer-motion";

export default function TransitionPage({ children, bg }) {
  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </motion.div>
  );
}

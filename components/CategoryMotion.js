import { motion } from "framer-motion";

export default function CategoryMotion({ children }) {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0},
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear",duration:1 }}
    >
      {children}
    </motion.div>
  );
}


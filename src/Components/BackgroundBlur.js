import { motion } from "framer-motion";
import { useState, useEffect } from "react";
export default function BackgroundBlur({ open, handleClose }) {
  //   const [isOpen, setOpen] = useState(open);
  return (
    <motion.div
      onClick={() => {
        // setOpen(false);
        handleClose(false);
      }}
      className="background-blur"
      initial={{
        scale: 0,
      }}
      animate={{
        scale: open ? 1 : 0,
        // scale: isOpen ? 1 : 0,
      }}
    ></motion.div>
  );
}

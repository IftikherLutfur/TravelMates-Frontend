"use client"
import { motion, useScroll, useSpring } from 'framer-motion'
const Style = () => {
    const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
    return (
        <div>
 <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#0066CC] origin-left z-50"
        style={{
          scaleX,
        }}
      />
        </div>
    );
};

export default Style;
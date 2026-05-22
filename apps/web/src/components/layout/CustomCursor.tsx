import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const CURSOR_SIZE = 8;
const CURSOR_RING_SIZE = 32;

export function CustomCursor(): React.JSX.Element | null {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isMagnetic, setIsMagnetic] = useState<boolean>(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (event: MouseEvent): void => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const handleMouseOver = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      const isInteractive = Boolean(
        target.closest('a, button, [role="button"], input, textarea, select'),
      );
      const hasMagneticCursor = Boolean(target.closest('[data-cursor="magnetic"]'));
      setIsHovering(isInteractive);
      setIsMagnetic(hasMagneticCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden rounded-full bg-foreground mix-blend-difference md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden rounded-full border border-foreground/20 md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? CURSOR_RING_SIZE * 1.5 : CURSOR_RING_SIZE,
          height: isHovering ? CURSOR_RING_SIZE * 1.5 : CURSOR_RING_SIZE,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovering ? 0.6 : 0.3,
          borderColor: isMagnetic ? 'var(--color-accent)' : 'var(--color-foreground)',
        }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
    </>
  );
}

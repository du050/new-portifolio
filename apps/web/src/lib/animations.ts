import type { Transition, Variants } from 'framer-motion';

export const motionEasing = {
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeOutQuart: [0.22, 1, 0.36, 1],
  softSpring: { type: 'spring', stiffness: 260, damping: 28, mass: 0.8 },
  magneticSpring: { type: 'spring', stiffness: 180, damping: 18, mass: 0.4 },
} as const;

export const motionTimings = {
  fast: 0.18,
  base: 0.42,
  slow: 0.72,
  reveal: 0.64,
} as const;

export const premiumTransition: Transition = {
  duration: motionTimings.base,
  ease: motionEasing.easeOutQuart,
};

export const cinematicTransition: Transition = {
  duration: motionTimings.reveal,
  ease: motionEasing.easeOutExpo,
};

export const premiumViewport = {
  once: true,
  margin: '-12% 0px -10% 0px',
  amount: 0.18,
} as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: cinematicTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: premiumTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.075, delayChildren: 0.08 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: premiumTransition,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: cinematicTransition,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: cinematicTransition,
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 10, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(6px)' },
  transition: premiumTransition,
};

export const cardHoverMotion = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.008 },
  tap: { scale: 0.992 },
} as const;

export const glowHoverMotion = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
} as const;

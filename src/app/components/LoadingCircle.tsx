import { motion } from 'framer-motion';

interface LoadingCircleProps {
  size?: number;
  thickness?: number;
  color?: string;
  speed?: number;
}

export const LoadingCircle = ({ size = 24, thickness = 2, color = 'currentColor', speed = 1 }: LoadingCircleProps) => {
  const center = size / 2;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const gapSize = 0.5;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ 
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={`${circumference * (1 - gapSize)} ${circumference * gapSize}`}
        strokeDashoffset={circumference * 0.25}
      />
    </motion.svg>
  );
};
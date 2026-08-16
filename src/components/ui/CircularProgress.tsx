import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({
  percentage = 75,
  size = 100,
  strokeWidth = 10,
}: CircularProgressProps) {
  // Clamp percentage to safe bounds [0, 100]
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Stroke placement: stroke is centered along the radius path.
  // To avoid SVG clipping when strokeLinecap is "round", radius computation must strictly pad strokeWidth.
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (clampedPercentage / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clampedPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90 transform"
        style={{ overflow: "visible" }}
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-400 opacity-30"
          fill="transparent"
        />
        {/* Animated Rounded Progress Arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-primary"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>

      {/* Center Label */}
      <div className="absolute text-lg font-semibold text-accent-foreground">
        {Math.round(clampedPercentage)}%
      </div>
    </div>
  );
}

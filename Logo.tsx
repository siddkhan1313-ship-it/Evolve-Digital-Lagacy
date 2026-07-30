
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40, showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Background Geometric Structure */}
        <path
          d="M20 30L50 15L80 30V70L50 85L20 70V30Z"
          className="stroke-sky-500/20 dark:stroke-sky-400/20"
          strokeWidth="1"
          fill="none"
        />
        
        {/* The Abstract Bloom 'X' Structure */}
        <g className="logo-main-paths">
          {/* Top-Left to Bottom-Right Path */}
          <path
            d="M30 30L70 70"
            className="stroke-sky-600 dark:stroke-sky-400"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Top-Right to Bottom-Left Path */}
          <path
            d="M70 30L30 70"
            className="stroke-indigo-600 dark:stroke-indigo-400"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>

        {/* Neural Nodes (The 'Bloom' aspect) */}
        <circle cx="50" cy="50" r="10" className="fill-white dark:fill-slate-900 stroke-sky-500 dark:stroke-sky-400" strokeWidth="3" />
        <circle cx="50" cy="50" r="4" className="fill-sky-500 dark:fill-sky-400 animate-pulse" />
        
        <circle cx="30" cy="30" r="5" className="fill-sky-500 dark:fill-sky-400" />
        <circle cx="70" cy="30" r="5" className="fill-indigo-500 dark:fill-indigo-400" />
        <circle cx="30" cy="70" r="5" className="fill-indigo-500 dark:fill-indigo-400" />
        <circle cx="70" cy="70" r="5" className="fill-sky-500 dark:fill-sky-400" />

        {/* Connection Lines */}
        <path
          d="M30 30H70V70H30V30Z"
          className="stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
      
      {showText && (
        <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center">
          FutureBloom<span className="text-sky-600 dark:text-sky-400">X</span>
        </span>
      )}
    </div>
  );
};

export default Logo;

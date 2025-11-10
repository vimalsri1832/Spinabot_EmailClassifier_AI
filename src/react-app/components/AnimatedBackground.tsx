import { useTheme } from './ThemeProvider';

export default function AnimatedBackground() {
  const { theme } = useTheme();

  return (
    <>
      {/* Base gradient background */}
      <div className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-black via-gray-950 to-violet-950/20' 
          : 'bg-gradient-to-br from-gray-50 via-white to-violet-50'
      }`} />
      
      {/* Flowing energy streams */}
      <svg className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="stream1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: theme === 'dark' ? '#8b5cf6' : '#a78bfa', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: theme === 'dark' ? '#a855f7' : '#c4b5fd', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: theme === 'dark' ? '#d946ef' : '#e9d5ff', stopOpacity: 0.2 }} />
          </linearGradient>
          
          <linearGradient id="stream2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: theme === 'dark' ? '#d946ef' : '#e9d5ff', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: theme === 'dark' ? '#a855f7' : '#c4b5fd', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: theme === 'dark' ? '#8b5cf6' : '#a78bfa', stopOpacity: 0.2 }} />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Stream 1 - Top flowing wave */}
        <path 
          d="M-200,150 Q200,50 600,150 T1400,150 T2200,150" 
          fill="none" 
          stroke="url(#stream1)" 
          strokeWidth="4"
          filter="url(#glow)"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M-200,150 Q200,50 600,150 T1400,150 T2200,150;
              M-200,180 Q200,80 600,180 T1400,180 T2200,180;
              M-200,150 Q200,50 600,150 T1400,150 T2200,150
            "
          />
        </path>

        {/* Stream 2 - Middle reverse flow */}
        <path 
          d="M2200,350 Q1800,450 1200,350 T200,350 T-400,350" 
          fill="none" 
          stroke="url(#stream2)" 
          strokeWidth="3"
          filter="url(#glow)"
        >
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="
              M2200,350 Q1800,450 1200,350 T200,350 T-400,350;
              M2200,320 Q1800,420 1200,320 T200,320 T-400,320;
              M2200,350 Q1800,450 1200,350 T200,350 T-400,350
            "
          />
        </path>

        {/* Stream 3 - Lower wave */}
        <path 
          d="M-200,550 Q300,480 800,550 T1600,550 T2400,550" 
          fill="none" 
          stroke="url(#stream1)" 
          strokeWidth="3"
          filter="url(#glow)"
        >
          <animate
            attributeName="d"
            dur="30s"
            repeatCount="indefinite"
            values="
              M-200,550 Q300,480 800,550 T1600,550 T2400,550;
              M-200,570 Q300,500 800,570 T1600,570 T2400,570;
              M-200,550 Q300,480 800,550 T1600,550 T2400,550
            "
          />
        </path>

        {/* Stream 4 - Bottom reverse */}
        <path 
          d="M2400,750 Q1900,850 1300,750 T100,750 T-500,750" 
          fill="none" 
          stroke="url(#stream2)" 
          strokeWidth="2"
          filter="url(#glow)"
        >
          <animate
            attributeName="d"
            dur="22s"
            repeatCount="indefinite"
            values="
              M2400,750 Q1900,850 1300,750 T100,750 T-500,750;
              M2400,720 Q1900,820 1300,720 T100,720 T-500,720;
              M2400,750 Q1900,850 1300,750 T100,750 T-500,750
            "
          />
        </path>

        {/* Energy particles flowing along streams */}
        <circle r="5" fill={theme === 'dark' ? '#8b5cf6' : '#a78bfa'} filter="url(#glow)">
          <animateMotion
            dur="15s"
            repeatCount="indefinite"
            path="M-200,150 Q200,50 600,150 T1400,150 T2200,150"
          />
          <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
          <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" />
        </circle>

        <circle r="4" fill={theme === 'dark' ? '#d946ef' : '#e9d5ff'} filter="url(#glow)">
          <animateMotion
            dur="20s"
            repeatCount="indefinite"
            path="M2200,350 Q1800,450 1200,350 T200,350 T-400,350"
          />
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;7;4" dur="4s" repeatCount="indefinite" />
        </circle>

        <circle r="4" fill={theme === 'dark' ? '#a855f7' : '#c4b5fd'} filter="url(#glow)">
          <animateMotion
            dur="25s"
            repeatCount="indefinite"
            path="M-200,550 Q300,480 800,550 T1600,550 T2400,550"
          />
          <animate attributeName="opacity" values="0.4;1;0.4" dur="5s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;6;4" dur="5s" repeatCount="indefinite" />
        </circle>

        <circle r="3" fill={theme === 'dark' ? '#8b5cf6' : '#a78bfa'} filter="url(#glow)">
          <animateMotion
            dur="18s"
            repeatCount="indefinite"
            path="M2400,750 Q1900,850 1300,750 T100,750 T-500,750"
          />
          <animate attributeName="opacity" values="0.3;1;0.3" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;6;3" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Floating orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl animate-float-slow animation-delay-4000" />
      </div>
    </>
  );
}

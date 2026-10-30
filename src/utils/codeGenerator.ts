import { ComponentItem, Framework, Styling } from '../types';

export function generateComponentCode(
  component: ComponentItem,
  framework: Framework,
  styling: Styling
): string {
  const componentPascalName = component.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  if (framework === 'framer') {
    return `// Framer Component: ${component.displayName}
// Category: ${component.categoryLabel}
// Generated for Framer Motion / Framer Canvas

import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer";
import { motion } from "framer-motion";

export function ${componentPascalName}(props) {
  const { tintColor, speed, interactive } = props;

  return (
    <motion.div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        overflow: "hidden",
        position: "relative",
      }}
      whileHover={interactive ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 * (1 / speed) }}
    >
      {/* ${component.displayName} canvas simulation */}
      <div 
        style={{
          width: "100%",
          height: "100%",
          background: \`radial-gradient(circle at center, \${tintColor}22 0%, transparent 70%)\`,
          borderRadius: 16,
        }}
      />
    </motion.div>
  );
}

${componentPascalName}.defaultProps = {
  tintColor: "#3b82f6",
  speed: 1,
  interactive: true,
};

addPropertyControls(${componentPascalName}, {
  tintColor: { type: ControlType.Color, title: "Tint Color", defaultValue: "#3b82f6" },
  speed: { type: ControlType.Number, title: "Speed", min: 0.1, max: 3, step: 0.1, defaultValue: 1 },
  interactive: { type: ControlType.Boolean, title: "Interactive", defaultValue: true },
});
`;
  }

  if (styling === 'tailwind') {
    return `// ${component.displayName} (${framework.toUpperCase()} + Tailwind CSS)
// ${component.description}

import React, { useEffect, useRef, useState } from 'react';

interface ${componentPascalName}Props {
  className?: string;
  intensity?: number;
  interactive?: boolean;
}

export const ${componentPascalName}: React.FC<${componentPascalName}Props> = ({
  className = '',
  intensity = 1.0,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.02 * intensity;
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      // Render ${component.displayName} particle field / shader motion
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.5);

      for (let i = 0; i < 48; i++) {
        const angle = (i / 48) * Math.PI * 2 + time;
        const dist = radius * (0.8 + 0.2 * Math.sin(time * 2 + i));
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;

        ctx.beginPath();
        ctx.arc(x, y, 2.5 * intensity, 0, Math.PI * 2);
        ctx.fillStyle = \`hsla(\${(i * 7 + time * 30) % 360}, 85%, 65%, 0.8)\`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#3b82f6';
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => interactive && setIsActive(true)}
      onMouseLeave={() => interactive && setIsActive(false)}
      className={\`relative w-full h-full min-h-[300px] overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/80 transition-all duration-300 \${
        isActive ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : ''
      } \${className}\`}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none" 
      />
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
          ${component.categoryLabel} / ${component.displayName}
        </span>
      </div>
    </div>
  );
};

export default ${componentPascalName};
`;
  }

  // Vanilla CSS version
  return `// ${component.displayName} (${framework.toUpperCase()} + Pure CSS)
// ${component.description}

import React, { useEffect, useRef } from 'react';

interface ${componentPascalName}Props {
  className?: string;
  color?: string;
}

export const ${componentPascalName}: React.FC<${componentPascalName}Props> = ({
  className = '',
  color = '#3b82f6',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.015;
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Animation loop for ${component.displayName}
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < w; x += 8) {
        const y = h / 2 + Math.sin(x * 0.02 + t) * 30 * Math.cos(t * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [color]);

  return (
    <div 
      className={\`entele-\${component.name} \${className}\`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '320px',
        backgroundColor: '#0c0e14',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block' }} 
      />
    </div>
  );
};

export default ${componentPascalName};
`;
}


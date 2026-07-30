import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  density?: 'high' | 'medium' | 'low';
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  density = 'medium',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({
    x: -1000,
    y: -1000,
    radius: 180,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const countMap = {
      low: Math.floor((width * height) / 25000),
      medium: Math.floor((width * height) / 14000),
      high: Math.floor((width * height) / 8000),
    };

    let particleCount = Math.min(130, Math.max(35, countMap[density]));
    let particles: Particle[] = [];

    const amberColors = ['#E58A2B', '#F59E0B', '#D97706', '#FBBF24'];
    const slateColors = ['#38BDF8', '#64748B', '#94A3B8', '#475569'];

    const initParticles = () => {
      particles = [];
      particleCount = Math.min(130, Math.max(35, countMap[density]));

      for (let i = 0; i < particleCount; i++) {
        const isSlate = Math.random() < 0.35;
        const colorPalette = isSlate ? slateColors : amberColors;
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        const baseAlpha = Math.random() * 0.4 + 0.15;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.8 + 0.6,
          color,
          alpha: baseAlpha,
          baseAlpha,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
    }
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes & subtle connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion update
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off canvas edges smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Alpha pulse animation
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.003;
        const currentAlpha = Math.max(0.1, Math.min(0.8, p.alpha));

        // Mouse interaction: push away or glow
        if (interactive) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRef.current.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            p.x -= Math.cos(angle) * force * 1.5;
            p.y -= Math.sin(angle) * force * 1.5;
          }
        }

        // Render glowing dot
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * 4;
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with subtle golden/cyan threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 110;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12 * currentAlpha;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

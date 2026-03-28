"use client";

import { useEffect, useRef, useCallback } from "react";

export type SplashPreset = 
  | "bubblegum"
  | "ocean"
  | "neon"
  | "lava"
  | "aurora"
  | "cosmic"
  | "emerald"
  | "sunset";

export interface SplashCursorConfig {
  preset?: SplashPreset;
  color?: string;
  secondaryColor?: string;
  size?: number;
  speed?: number;
  fade?: number;
  swirlAmount?: number;
  interactionStrength?: number;
  enable3DShading?: boolean;
  transparency?: number;
  quality?: "low" | "medium" | "high" | "ultra";
  detailLevel?: number;
  motionFade?: number;
  fluidPressure?: number;
  trailLength?: number;
  particleCount?: number;
}

interface ResolvedConfig {
  color: string;
  secondaryColor: string;
  size: number;
  speed: number;
  fade: number;
  swirlAmount: number;
  interactionStrength: number;
  enable3DShading: boolean;
  transparency: number;
  quality: "low" | "medium" | "high" | "ultra";
  detailLevel: number;
  motionFade: number;
  fluidPressure: number;
  trailLength: number;
  particleCount: number;
}

const PRESETS: Record<SplashPreset, ResolvedConfig> = {
  bubblegum: {
    color: "#ff6b9d",
    secondaryColor: "#c44569",
    size: 40,
    speed: 0.15,
    fade: 0.92,
    swirlAmount: 0.8,
    interactionStrength: 1.2,
    enable3DShading: true,
    transparency: 0.8,
    quality: "high",
    detailLevel: 3,
    motionFade: 0.95,
    fluidPressure: 0.6,
    trailLength: 20,
    particleCount: 8,
  },
  ocean: {
    color: "#00d4ff",
    secondaryColor: "#0099cc",
    size: 50,
    speed: 0.1,
    fade: 0.94,
    swirlAmount: 1.2,
    interactionStrength: 0.8,
    enable3DShading: true,
    transparency: 0.7,
    quality: "high",
    detailLevel: 4,
    motionFade: 0.97,
    fluidPressure: 0.8,
    trailLength: 30,
    particleCount: 12,
  },
  neon: {
    color: "#00ff88",
    secondaryColor: "#ff00ff",
    size: 35,
    speed: 0.2,
    fade: 0.88,
    swirlAmount: 0.6,
    interactionStrength: 1.5,
    enable3DShading: true,
    transparency: 0.9,
    quality: "ultra",
    detailLevel: 5,
    motionFade: 0.92,
    fluidPressure: 0.5,
    trailLength: 15,
    particleCount: 6,
  },
  lava: {
    color: "#ff4400",
    secondaryColor: "#ffaa00",
    size: 55,
    speed: 0.08,
    fade: 0.96,
    swirlAmount: 1.5,
    interactionStrength: 0.6,
    enable3DShading: true,
    transparency: 0.75,
    quality: "high",
    detailLevel: 4,
    motionFade: 0.98,
    fluidPressure: 1.0,
    trailLength: 40,
    particleCount: 15,
  },
  aurora: {
    color: "#88ffcc",
    secondaryColor: "#aa88ff",
    size: 60,
    speed: 0.06,
    fade: 0.97,
    swirlAmount: 2.0,
    interactionStrength: 0.4,
    enable3DShading: true,
    transparency: 0.5,
    quality: "ultra",
    detailLevel: 5,
    motionFade: 0.98,
    fluidPressure: 0.3,
    trailLength: 50,
    particleCount: 20,
  },
  cosmic: {
    color: "#9d4edd",
    secondaryColor: "#3c096c",
    size: 45,
    speed: 0.12,
    fade: 0.93,
    swirlAmount: 1.0,
    interactionStrength: 1.0,
    enable3DShading: true,
    transparency: 0.85,
    quality: "high",
    detailLevel: 4,
    motionFade: 0.95,
    fluidPressure: 0.7,
    trailLength: 25,
    particleCount: 10,
  },
  emerald: {
    color: "#2ecc71",
    secondaryColor: "#1a5c35",
    size: 42,
    speed: 0.11,
    fade: 0.94,
    swirlAmount: 0.9,
    interactionStrength: 1.1,
    enable3DShading: true,
    transparency: 0.75,
    quality: "high",
    detailLevel: 3,
    motionFade: 0.96,
    fluidPressure: 0.65,
    trailLength: 22,
    particleCount: 9,
  },
  sunset: {
    color: "#f39c12",
    secondaryColor: "#e74c3c",
    size: 48,
    speed: 0.09,
    fade: 0.95,
    swirlAmount: 1.1,
    interactionStrength: 0.9,
    enable3DShading: true,
    transparency: 0.7,
    quality: "high",
    detailLevel: 4,
    motionFade: 0.97,
    fluidPressure: 0.75,
    trailLength: 35,
    particleCount: 11,
  },
};

const QUALITY_MULTIPLIERS: Record<"low" | "medium" | "high" | "ultra", number> = {
  low: 0.5,
  medium: 0.75,
  high: 1,
  ultra: 1.5,
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  angle: number;
  life: number;
  maxLife: number;
}

interface TrailPoint {
  x: number;
  y: number;
  size: number;
  alpha: number;
}

export function SplashCursor({
  preset = "bubblegum",
  color,
  secondaryColor,
  size,
  speed,
  fade,
  swirlAmount,
  interactionStrength,
  enable3DShading,
  transparency,
  quality,
  detailLevel,
  motionFade,
  fluidPressure,
  trailLength,
  particleCount,
}: SplashCursorConfig) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  const config: ResolvedConfig = {
    ...PRESETS[preset],
    ...(color !== undefined && { color }),
    ...(secondaryColor !== undefined && { secondaryColor }),
    ...(size !== undefined && { size }),
    ...(speed !== undefined && { speed }),
    ...(fade !== undefined && { fade }),
    ...(swirlAmount !== undefined && { swirlAmount }),
    ...(interactionStrength !== undefined && { interactionStrength }),
    ...(enable3DShading !== undefined && { enable3DShading }),
    ...(transparency !== undefined && { transparency }),
    ...(quality !== undefined && { quality }),
    ...(detailLevel !== undefined && { detailLevel }),
    ...(motionFade !== undefined && { motionFade }),
    ...(fluidPressure !== undefined && { fluidPressure }),
    ...(trailLength !== undefined && { trailLength }),
    ...(particleCount !== undefined && { particleCount }),
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 };
  };

  const lerpColor = (
    color1: string,
    color2: string,
    t: number
  ): string => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const createParticle = useCallback(
    (x: number, y: number, velocity: { x: number; y: number }): Particle => {
      const qualityMult = QUALITY_MULTIPLIERS[config.quality];
      const angle =
        Math.atan2(velocity.y, velocity.x) +
        (Math.random() - 0.5) * config.swirlAmount;
      const speed2 = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
      const life = 40 + Math.random() * 40;

      return {
        x: x + (Math.random() - 0.5) * config.size * 0.5,
        y: y + (Math.random() - 0.5) * config.size * 0.5,
        vx: Math.cos(angle) * speed2 * 0.3 * config.interactionStrength,
        vy: Math.sin(angle) * speed2 * 0.3 * config.interactionStrength,
        size: (config.size * 0.3 + Math.random() * config.size * 0.3) * qualityMult,
        alpha: config.transparency,
        color:
          Math.random() > 0.5 ? config.color : config.secondaryColor,
        angle: angle,
        life: life,
        maxLife: life,
      };
    },
    [config]
  );

  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, particle: Particle) => {
      const lifeRatio = particle.life / particle.maxLife;
      const currentSize = particle.size * lifeRatio;
      const currentAlpha = particle.alpha * lifeRatio;

      if (currentSize < 0.5 || currentAlpha < 0.01) return;

      ctx.save();
      ctx.translate(particle.x, particle.y);

      if (config.enable3DShading) {
        const gradient = ctx.createRadialGradient(
          -currentSize * 0.3,
          -currentSize * 0.3,
          0,
          0,
          0,
          currentSize
        );

        const rgb = hexToRgb(particle.color);
        const highlightAlpha = Math.min(currentAlpha * 1.5, 1);
        const baseAlpha = currentAlpha * 0.8;
        const shadowAlpha = currentAlpha * 0.3;

        gradient.addColorStop(0, `rgba(${Math.min(rgb.r + 80, 255)}, ${Math.min(rgb.g + 80, 255)}, ${Math.min(rgb.b + 80, 255)}, ${highlightAlpha})`);
        gradient.addColorStop(0.4, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha})`);
        gradient.addColorStop(1, `rgba(${Math.max(rgb.r - 50, 0)}, ${Math.max(rgb.g - 50, 0)}, ${Math.max(rgb.b - 50, 0)}, ${shadowAlpha})`);

        ctx.fillStyle = gradient;
      } else {
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = particle.color;
      }

      ctx.beginPath();

      for (let i = 0; i < config.detailLevel * 2 + 6; i++) {
        const angle = (i / (config.detailLevel * 2 + 6)) * Math.PI * 2;
        const wobble =
          Math.sin(angle * 3 + timeRef.current * 0.1) * config.fluidPressure * 3;
        const radius = currentSize + wobble;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.fill();

      if (config.enable3DShading && currentSize > 5) {
        ctx.globalAlpha = currentAlpha * 0.3;
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(
          -currentSize * 0.2,
          -currentSize * 0.2,
          currentSize * 0.25,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.restore();
    },
    [config]
  );

  const drawTrail = useCallback(
    (ctx: CanvasRenderingContext2D, trail: TrailPoint[]) => {
      if (trail.length < 2) return;

      for (let i = 1; i < trail.length; i++) {
        const point = trail[i];
        const prevPoint = trail[i - 1];
        const progress = i / trail.length;

        ctx.save();
        ctx.globalAlpha = point.alpha * (1 - progress) * 0.5;

        const gradient = ctx.createLinearGradient(
          prevPoint.x,
          prevPoint.y,
          point.x,
          point.y
        );
        gradient.addColorStop(0, lerpColor(config.color, config.secondaryColor, (i - 1) / trail.length));
        gradient.addColorStop(1, lerpColor(config.color, config.secondaryColor, i / trail.length));

        ctx.strokeStyle = gradient;
        ctx.lineWidth = point.size * (1 - progress * 0.8);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();

        ctx.restore();
      }
    },
    [config]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    timeRef.current++;

    const mouse = mouseRef.current;
    const dx = mouse.x - mouse.px;
    const dy = mouse.y - mouse.py;
    const velocity = Math.sqrt(dx * dx + dy * dy);

    if (velocity > 1) {
      trailRef.current.push({
        x: mouse.x,
        y: mouse.y,
        size: config.size * 0.3,
        alpha: config.transparency,
      });

      if (trailRef.current.length > config.trailLength) {
        trailRef.current.shift();
      }

      if (Math.random() < velocity * 0.05 * config.speed && particlesRef.current.length < 100) {
        for (let i = 0; i < Math.min(config.particleCount, 5); i++) {
          particlesRef.current.push(
            createParticle(mouse.x, mouse.y, { x: dx, y: dy })
          );
        }
      }
    }

    drawTrail(ctx, trailRef.current);

    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= config.fade;
      particle.vy *= config.fade;
      particle.vx += Math.sin(timeRef.current * 0.05) * config.swirlAmount * 0.1;
      particle.vy += Math.cos(timeRef.current * 0.05) * config.swirlAmount * 0.1;
      particle.life -= 1;
      particle.size *= config.motionFade;

      if (particle.life > 0 && particle.size > 0.5) {
        drawParticle(ctx, particle);
        return true;
      }
      return false;
    });

    trailRef.current.forEach((point) => {
      point.alpha *= config.fade;
    });

    mouse.px = mouse.x + (mouse.x - mouse.px) * config.speed;
    mouse.py = mouse.y + (mouse.y - mouse.py) * config.speed;

    animationRef.current = requestAnimationFrame(animate);
  }, [config, createParticle, drawParticle, drawTrail]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    contextRef.current = ctx;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

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

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    mouseRef.current.px = mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.py = mouseRef.current.y = window.innerHeight / 2;

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

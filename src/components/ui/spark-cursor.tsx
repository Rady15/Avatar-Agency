"use client";

import { useEffect, useRef } from "react";

export interface SparkCursorConfig {
  color?: string;
  secondaryColor?: string;
  particleSize?: number;
  particleCount?: number;
  speed?: number;
  gravity?: number;
  fadeSpeed?: number;
  sparkle?: boolean;
  glow?: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
}

export function SparkCursor({
  color = "#ffd700",
  secondaryColor = "#ff6b35",
  particleSize = 4,
  particleCount = 3,
  speed = 8,
  gravity = 0.15,
  fadeSpeed = 0.96,
  sparkle = true,
  glow = true,
}: SparkCursorConfig) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const sparksRef = useRef<Spark[]>([]);
  const animationRef = useRef<number>(0);
  const lastEmitRef = useRef(0);
  const configRef = useRef({ color, secondaryColor, particleSize, particleCount, speed, gravity, fadeSpeed, sparkle, glow });

  configRef.current = { color, secondaryColor, particleSize, particleCount, speed, gravity, fadeSpeed, sparkle, glow };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 255, g: 215, b: 0 };
    };

    const createSpark = (x: number, y: number, velocity: { x: number; y: number }): Spark => {
      const config = configRef.current;
      const angle = Math.random() * Math.PI * 2;
      const sparkSpeed = (Math.random() * 0.5 + 0.5) * config.speed;
      const life = 30 + Math.random() * 50;

      return {
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * sparkSpeed + velocity.x * 0.2,
        vy: Math.sin(angle) * sparkSpeed + velocity.y * 0.2 - 2,
        size: config.particleSize * (0.5 + Math.random() * 0.5),
        alpha: 1,
        color: Math.random() > 0.5 ? config.color : config.secondaryColor,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        life: life,
        maxLife: life,
      };
    };

    const drawSpark = (spark: Spark) => {
      const config = configRef.current;
      const lifeRatio = spark.life / spark.maxLife;
      const currentSize = spark.size * lifeRatio;
      const currentAlpha = spark.alpha * lifeRatio;

      if (currentSize < 0.3 || currentAlpha < 0.01) return;

      ctx.save();
      ctx.translate(spark.x, spark.y);
      ctx.rotate(spark.rotation);

      const rgb = hexToRgb(spark.color);

      if (config.glow) {
        ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentAlpha})`;
        ctx.shadowBlur = currentSize * 3;
      }

      if (config.sparkle && Math.random() > 0.7) {
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(0, 0, currentSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
      gradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentAlpha})`);
      gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, -currentSize * 2);
      ctx.lineTo(currentSize * 0.5, 0);
      ctx.lineTo(0, currentSize * 2);
      ctx.lineTo(-currentSize * 0.5, 0);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-currentSize * 2, 0);
      ctx.lineTo(0, currentSize * 0.5);
      ctx.lineTo(currentSize * 2, 0);
      ctx.lineTo(0, -currentSize * 0.5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      const config = configRef.current;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const dx = mouse.x - mouse.px;
      const dy = mouse.y - mouse.py;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      if (velocity > 0.5) {
        const now = Date.now();
        if (now - lastEmitRef.current > 16) {
          const count = Math.min(Math.ceil(velocity * 0.3), config.particleCount);
          for (let i = 0; i < count; i++) {
            sparksRef.current.push(createSpark(mouse.x, mouse.y, { x: dx, y: dy }));
          }
          lastEmitRef.current = now;
        }
      }

      sparksRef.current = sparksRef.current.filter((spark) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += config.gravity;
        spark.vx *= 0.98;
        spark.rotation += spark.rotationSpeed;
        spark.life -= 1;
        spark.alpha *= config.fadeSpeed;

        if (spark.life > 0 && spark.alpha > 0.01) {
          drawSpark(spark);
          return true;
        }
        return false;
      });

      mouse.px = mouse.x + (mouse.x - mouse.px) * 0.3;
      mouse.py = mouse.y + (mouse.y - mouse.py) * 0.3;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}

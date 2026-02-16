import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        arabic: ["var(--font-tajawal)"],
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "slow-rotate": "slow-rotate 30s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "card-enter": "card-enter 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "statue-reveal": "statue-reveal 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        blink: "blink-caret 0.75s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
        "slow-rotate": {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))" },
          "50%": { filter: "drop-shadow(0 0 40px rgba(212, 175, 55, 0.6))" },
        },
        "card-enter": {
          from: {
            opacity: "0",
            transform: "translateX(100px) rotateY(-20deg) scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0) rotateY(0) scale(1)",
          },
        },
        "statue-reveal": {
          from: {
            opacity: "0",
            transform: "translateY(100px) rotateX(15deg)",
            filter: "blur(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) rotateX(0)",
            filter: "blur(0)",
          },
        },
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "var(--primary)" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;

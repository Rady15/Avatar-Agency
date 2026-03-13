"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

type Testimonial = {
    quote: string;
    quoteEn?: string;
    name: string;
    nameEn?: string;
    designation: string;
    designationEn?: string;
    src: string;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
    className,
    accentColor = "#ffffff",
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
    className?: string;
    accentColor?: string;
}) => {
    const { language, isMounted } = useLanguage();
    const [active, setActive] = useState(0);
    const [randomRotations, setRandomRotations] = useState<number[]>([]);

    useEffect(() => {
        // Generate random rotations once on mount to avoid hydration mismatches
        const rotations = testimonials.map(() => Math.floor(Math.random() * 21) - 10);
        setRandomRotations(rotations);
    }, [testimonials]);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const getRandomRotateY = (index: number) => {
        return randomRotations[index] || 0;
    };

    return (
        <div className={cn("max-w-sm md:max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-10", className)}>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                <div className="order-2 md:order-1">
                    <div className="relative h-80 w-full">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.src}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: getRandomRotateY(index),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index) ? 0 : getRandomRotateY(index),
                                        zIndex: isActive(index)
                                            ? 99
                                            : testimonials.length + 2 - index,
                                        y: isActive(index) ? [0, -80, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: getRandomRotateY(index),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <div className="h-full w-full rounded-3xl bg-white p-2 shadow-2xl">
                                        <img
                                            src={testimonial.src}
                                            alt={testimonial.name}
                                            draggable={false}
                                            className="h-full w-full rounded-2xl object-contain"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex justify-between flex-col py-4 order-1 md:order-2 text-right" style={{ direction: 'rtl' }}>
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <h3 className="text-3xl font-bold" style={{ color: "white" }}>
                            {language === 'ar' ? testimonials[active].name : (testimonials[active].nameEn || testimonials[active].name)}
                        </h3>
                        <p className="text-sm opacity-60" style={{ color: "white" }}>
                            {language === 'ar' ? testimonials[active].designation : (testimonials[active].designationEn || testimonials[active].designation)}
                        </p>
                        <motion.p className="text-lg mt-8" style={{ color: "rgba(255,255,255,0.8)" }}>
                            {(language === 'ar' ? testimonials[active].quote : (testimonials[active].quoteEn || testimonials[active].quote)).split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        filter: "blur(10px)",
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        filter: "blur(0px)",
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    className="inline-block"
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                    <div className="flex gap-4 pt-12 md:pt-0 justify-end">
                        <button
                            onClick={handlePrev}
                            className="h-10 w-10 rounded-full flex items-center justify-center group/button bg-white/10 hover:bg-white/20 transition-all"
                        >
                            <ChevronRight className="h-6 w-6 text-white group-hover/button:rotate-12 transition-transform duration-300" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="h-10 w-10 rounded-full flex items-center justify-center group/button bg-white/10 hover:bg-white/20 transition-all"
                        >
                            <ChevronLeft className="h-6 w-6 text-white group-hover/button:-rotate-12 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface CarouselImage {
    src: string;
    alt: string;
}

interface CardCarouselProps {
    images: CarouselImage[];
    autoplayDelay?: number;
    showPagination?: boolean;
    showNavigation?: boolean;
    title?: string;
    subtitle?: string;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
    images,
    autoplayDelay = 2000,
    showPagination = true,
    showNavigation = true,
    title,
    subtitle,
}) => {
    const css = `
    .portfolio-swiper {
      width: 100%;
      padding-bottom: 50px !important;
      padding-top: 20px !important;
    }
    .portfolio-swiper .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 280px;
      height: 360px;
      border-radius: 16px;
      overflow: hidden;
      background-color: #1a1a1a;
    }
    .portfolio-swiper .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover !important;
      object-position: center;
      border-radius: 16px;
    }
    .portfolio-swiper .swiper-3d .swiper-slide-shadow-left {
      background-image: linear-gradient(to left, rgba(0,0,0,0.5), rgba(0,0,0,0));
    }
    .portfolio-swiper .swiper-3d .swiper-slide-shadow-right {
      background-image: linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0));
    }
    .portfolio-swiper .swiper-pagination-bullet {
      background: rgba(212, 175, 55, 0.5);
      width: 8px;
      height: 8px;
    }
    .portfolio-swiper .swiper-pagination-bullet-active {
      background: #D4AF37;
      width: 24px;
      border-radius: 4px;
    }
    .portfolio-swiper .swiper-button-next,
    .portfolio-swiper .swiper-button-prev {
      color: #D4AF37;
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(212, 175, 55, 0.3);
    }
    .portfolio-swiper .swiper-button-next::after,
    .portfolio-swiper .swiper-button-prev::after {
      font-size: 14px;
      font-weight: bold;
    }
  `;

    return (
        <div className="w-full">
            <style>{css}</style>
            {(title || subtitle) && (
                <div className="text-center mb-6">
                    {title && <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>}
                    {subtitle && <p className="text-white/50 text-sm">{subtitle}</p>}
                </div>
            )}
            <Swiper
                className="portfolio-swiper"
                spaceBetween={30}
                autoplay={{
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                }}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 120,
                    modifier: 2.5,
                    slideShadows: true,
                }}
                pagination={showPagination ? { clickable: true } : false}
                navigation={
                    showNavigation
                        ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
                        : false
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.src} alt={image.alt} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMapPin, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import './Hero.css';

// Import backgrounds
import makkahBg from '/hero_makkah_background_1764893075599.jpg';
import mountainBg from '/hero_mountain_background_1764893090134.jpg';
import beachBg from '/beach.jpg';
import dubaiBg from '/dubai.jpg';
const heroSlides = [
    {
        id: 1,
        theme: 'makkah',
        background: makkahBg,
        tag: 'رحلة روحانية',
        headline: 'اكتشف مكة المكرمة',
        subtitle: 'رحلة الحج والعمرة بأفضل الخدمات والأسعار المميزة',
        cta: 'احجز رحلتك الآن',
        gradient: 'linear-gradient(180deg, rgba(8,145,178,0.2) 0%, rgba(8,145,178,0.75) 100%)'
    },
    {
        id: 2,
        theme: 'mountain',
        background: mountainBg,
        tag: 'مغامرة جبلية',
        headline: 'قمم الألب الخلابة',
        subtitle: 'تجربة فريدة في أجمل المناظر الطبيعية الجبلية',
        cta: 'استكشف الجبال',
        gradient: 'linear-gradient(180deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.75) 100%)'
    },
    {
        id: 3,
        theme: 'beach',
        background: beachBg,
        tag: 'جنة استوائية',
        headline: 'شواطئ المالديف الساحرة',
        subtitle: 'استرخ في أجمل الجزر الاستوائية بمياهها الفيروزية',
        cta: 'اكتشف الشواطئ',
        gradient: 'linear-gradient(180deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.75) 100%)'
    },
    {
        id: 4,
        theme: 'city',
        background: dubaiBg, // Placeholder
        tag: 'مدينة عصرية',
        headline: 'دبي المدينة المستقبلية',
        subtitle: 'استكشف عجائب العمارة الحديثة والحياة الفاخرة',
        cta: 'اكتشف المدن',
        gradient: 'linear-gradient(180deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.75) 100%)'
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [progress, setProgress] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setProgress(0);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
        setProgress(0);
    }, []);

    const goToSlide = useCallback((index) => {
        setCurrentSlide(index);
        setProgress(0);
    }, []);

    // Auto-play with progress
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + 2.86; // 2.86% every 100ms = 3.5 seconds
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const currentSlideData = heroSlides[currentSlide];

    return (
        <section
            className="hero-slider-premium"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Background Slider */}
            <div className="hero-slider-backgrounds">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="hero-slider-background"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        style={{
                            backgroundImage: `${currentSlideData.gradient}, url(${currentSlideData.background})`
                        }}
                    />
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="hero-slider-content-wrapper">
                <div className="container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            className="hero-slider-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Destination Tag */}
                            <motion.div
                                className="hero-destination-tag glass"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            >
                                <FiMapPin className="tag-icon" />
                                <span>{currentSlideData.tag}</span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                className="hero-slider-headline gradient-text"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                            >
                                {currentSlideData.headline}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                className="hero-slider-subtitle"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            >
                                {currentSlideData.subtitle}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                className="hero-slider-cta"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                            >
                                <Link to="/destinations" className="hero-btn-hero">
                                    <span>{currentSlideData.cta}</span>
                                    <span className="btn-arrow">←</span>
                                </Link>
                                <Link to="/contact" className="hero-btn-hero-outline glass">
                                    تواصل معنا
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                className="hero-nav-arrow hero-nav-prev glass"
                onClick={prevSlide}
                aria-label="الشريحة السابقة"
            >
                <FiArrowRight size={24} />
            </button>
            <button
                className="hero-nav-arrow hero-nav-next glass"
                onClick={nextSlide}
                aria-label="الشريحة التالية"
            >
                <FiArrowLeft size={24} />
            </button>

            {/* Controls Container */}  
            <div className="hero-slider-controls">
                {/* Slide Counter */}
                <div className="slide-counter glass">
                    <span className="current">{String(currentSlide + 1).padStart(2, '0')}</span>
                    <span className="separator">/</span>
                    <span className="total">{String(heroSlides.length).padStart(2, '0')}</span>
                </div>

                {/* Dot Indicators */}
                <div className="slide-indicators-premium">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`slide-dot-premium ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`الذهاب إلى الشريحة ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="slide-progress glass">
                    <div
                        className="progress-fill-premium"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;

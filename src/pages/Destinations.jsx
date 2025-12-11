import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { allDestinations } from '../data';
import LazyImage from '../components/common/LazyImage';
import { FiMapPin, FiArrowLeft } from 'react-icons/fi';
import './Destinations.css';

const Destinations = () => {
    // Sliding text animation words - popular destinations
    const slidingWords = ["مكة المكرمة", "دبي", "باريس", "مالديف", "إسطنبول", "لندن", "طوكيو", "نيويورك"];

    return (
        <div className="destinations-page">
            {/* Enhanced Hero Section */}
            <section className="destinations-hero" aria-label="وجهاتنا السياحية">
                <div className="destinations-hero-overlay"></div>
                <div className="destinations-hero-pattern"></div>
                
                <div className="container destinations-hero-content">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="destinations-hero-badge"
                    >
                        <FiMapPin aria-hidden="true" />
                        <span>اكتشف العالم</span>
                    </motion.div>

                    {/* Main Title with Animated Underline */}
                    <div className="destinations-title-wrapper">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="destinations-hero-title"
                        >
                            وجهاتنا السياحية
                            <motion.span
                                className="destinations-title-underline"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                            />
                        </motion.h1>
                    </div>

                    {/* Sliding Text Animation (RTL) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="destinations-sliding-text-wrapper"
                        aria-label="وجهاتنا المميزة"
                    >
                        <div className="destinations-sliding-text">
                            {[...slidingWords, ...slidingWords].map((word, index) => (
                                <span key={`${word}-${index}`} className="sliding-word">
                                    {word}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="destinations-hero-subtitle"
                    >
                        اختر وجهتك القادمة من بين أجمل مدن العالم
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="destinations-hero-cta"
                    >
                        <Link 
                            to="/contact" 
                            className="destinations-cta-button"
                            aria-label="تواصل معنا لحجز رحلتك"
                        >
                            <span>احجز رحلتك الآن</span>
                            <FiArrowLeft aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <div className="container section">
                <div className="destinations-grid-layout">
                    {allDestinations.map((dest, index) => {
                        const isSpecial = dest.name === "مكة المكرمة" || dest.name === "المدينة المنورة";
                        return (
                        <motion.div
                            key={dest.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="destination-card-full"
                            data-special={isSpecial}
                        >
                            <div className="dest-img-wrapper">
                                <LazyImage src={dest.image} alt={dest.name} className="dest-full-img" />
                                <div className="dest-overlay-gradient"></div>
                                <div className="dest-duration-badge">
                                    <FiMapPin className="dest-badge-icon" />
                                    <span>{dest.duration}</span>
                                </div>
                            </div>

                            <div className="dest-content">
                                <div className="dest-header">
                                    <div>
                                        <h3 className="dest-title">{dest.name}</h3>
                                        <span className="dest-country">{dest.country}</span>
                                    </div>
                                </div>

                                <p className="dest-desc">{dest.description}</p>

                                <div className="dest-features">
                                    {dest.features.map((feature, i) => (
                                        <span key={i} className="dest-feature-tag">{feature}</span>
                                    ))}
                                </div>

                                <Link 
                                    to="/contact" 
                                    className="btn btn-primary w-full mt-md dest-cta-btn"
                                    state={{ destination: dest.name }}
                                >
                                    <span>احجز الآن</span>
                                    <FiArrowLeft className="dest-btn-icon" />
                                </Link>
                            </div>
                        </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Destinations;

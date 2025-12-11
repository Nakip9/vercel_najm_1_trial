import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandableServiceCard from '../components/common/ExpandableServiceCard';
import { allServices } from '../data/services';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiAward, FiUsers, FiClock, FiChevronDown, FiGlobe, FiMapPin, FiFileText, FiMap } from 'react-icons/fi';
import { TbPlane, TbBuilding, TbMap, TbBus, TbShip, TbLanguage, TbBuildingMosque } from 'react-icons/tb';
import LazyImage from '../components/common/LazyImage';
import './Services.css';

const Services = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedCardTitle, setExpandedCardTitle] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Animate text on load
        const timer = setTimeout(() => {
            setIsTextVisible(true);
        }, 300);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    // Use all services from data file with safety check
    const services = Array.isArray(allServices) ? allServices : [];

    const filters = [
        { id: 'all', label: 'الكل', icon: <FiAward /> },
        { id: 'flights', label: 'طيران', icon: <TbPlane /> },
        { id: 'hotels', label: 'فنادق', icon: <TbBuilding /> },
        { id: 'tours', label: 'سياحية', icon: <TbMap /> },
        { id: 'transport', label: 'مواصلات', icon: <TbBus /> },
        { id: 'cruises', label: 'بحري', icon: <TbShip /> },
        { id: 'translation', label: 'ترجمة', icon: <TbLanguage /> },
        { id: 'hajj', label: 'حج وعمرة', icon: <TbBuildingMosque /> },
        { id: 'visa', label: 'تأشيرات', icon: <FiGlobe /> },
        { id: 'education', label: 'دراسة', icon: <FiFileText /> },
        { id: 'medical', label: 'علاجية', icon: <FiMap /> },
        { id: 'events', label: 'معارض', icon: <FiAward /> },
        { id: 'domestic', label: 'داخلية', icon: <TbMap /> }
    ];

    const handleCardToggle = (title) => {
        setExpandedCardTitle(expandedCardTitle === title ? null : title);
    };

    const filteredServices = activeFilter === 'all'
        ? services
        : services.filter(service => service && service.category === activeFilter);

    const features = [
        {
            icon: <FiAward />,
            title: "خبرة واسعة",
            desc: "أكثر من 15 عاماً في مجال السياحة"
        },
        {
            icon: <FiUsers />,
            title: "فريق متخصص",
            desc: "مستشارون سياحيون لخدمتك"
        },
        {
            icon: <FiClock />,
            title: "دعم متواصل",
            desc: "خدمة عملاء على مدار الساعة"
        },
        {
            icon: <FiCheckCircle />,
            title: "أفضل الأسعار",
            desc: "ضمان أفضل قيمة مقابل المال"
        }
    ];

    const heroWords = ["طيران", "فنادق", "سياحة", "ترجمة", "حج", "عمرة", "تأشيرات", "مواصلات"];

    return (
        <div className="services-page">
            {/* Enhanced Hero Section with Animated Text */}
            <div className="services-hero" ref={heroRef}>
                <div className="hero-overlay"></div>
                <div className="hero-pattern"></div>
                
                <div className="container hero-container">
                    <div className="hero-content">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hero-badge"
                        >
                            <span>النجم الأزرق للرحلات</span>
                        </motion.div>
                        
                        <div className="hero-title-container">
                            <h1 className="hero-main-title">خدمات سياحية</h1>
                            
                            <div className="hero-words-animation">
                                <div className="words-container">
                                    {heroWords.map((word, index) => (
                                        <motion.span
                                            key={word}
                                            className={`hero-word ${isTextVisible ? 'visible' : ''}`}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={isTextVisible ? { 
                                                opacity: 1, 
                                                x: 0,
                                                transition: {
                                                    delay: index * 0.2,
                                                    duration: 0.6,
                                                    ease: "easeOut"
                                                }
                                            } : {}}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </div>
                                <div className="hero-subtitle">
                                    في مكان واحد، لكل احتياجات سفرك
                                </div>
                            </div>
                        </div>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="hero-description"
                        >
                            نقدم حلولاً متكاملة للسفر والسياحة، من حجز التذاكر إلى البرامج السياحية الكاملة
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="hero-actions"
                        >
                            <Link to="/contact" className="btn-services btn-services-primary">
                                ابدأ رحلتك الآن
                            </Link>
                            <a href="#services" className="btn-services btn-services-secondary">
                                تصفح الخدمات
                                <FiChevronDown className="btn-icon" />
                            </a>
                        </motion.div>
                    </div>

                    <div className="hero-visual">
                        <div className="service-icons-grid">
                            <div className="icon-item">
                                <TbPlane />
                                <span>طيران</span>
                            </div>
                            <div className="icon-item">
                                <TbBuilding />
                                <span>فنادق</span>
                            </div>
                            <div className="icon-item">
                                <TbMap />
                                <span>جولات</span>
                            </div>
                            <div className="icon-item">
                                <TbLanguage />
                                <span>ترجمة</span>
                            </div>
                            <div className="icon-item">
                                <TbBuildingMosque />
                                <span>حج وعمرة</span>
                            </div>
                            <div className="icon-item">
                                <FiGlobe />
                                <span>تأشيرات</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className={`scroll-indicator ${isScrolled ? 'hidden' : ''}`}>
                    <div className="scroll-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            </div>

            {/* Features Strip */}
            <div className="features-strip">
                <div className="container">
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="feature-card"
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <div className="feature-text">
                                    <h4>{feature.title}</h4>
                                    <p>{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section id="services" className="services-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">جميع خدماتنا</h2>
                        <p className="section-subtitle">اختر من القائمة التالية ما يناسب احتياجاتك</p>
                        
                        {/* Mobile Filter Toggle */}
                        <div className="mobile-filter-toggle">
                            <span>التصنيف:</span>
                            <select 
                                value={activeFilter}
                                onChange={(e) => setActiveFilter(e.target.value)}
                                className="filter-select"
                            >
                                {filters.map(filter => (
                                    <option key={filter.id} value={filter.id}>
                                        {filter.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Desktop Filter Bar */}
                    <div className="desktop-filter-bar">
                        <div className="filter-buttons">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(filter.id)}
                                >
                                    <span className="filter-icon">{filter.icon}</span>
                                    <span className="filter-label">{filter.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="results-count">
                        <span className="count-number">{filteredServices.length}</span>
                        <span className="count-text">خدمة متاحة</span>
                    </div>

                    {/* Services Grid */}
                    <div className="services-grid">
                        <AnimatePresence>
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service, index) => {
                                    if (!service || !service.title) return null;
                                    return (
                                        <ExpandableServiceCard
                                            key={service.title + index}
                                            title={service.title}
                                            tagline={service.tagline || ''}
                                            icon={service.icon}
                                            detailedDescription={service.detailedDescription || ''}
                                            features={service.features || []}
                                            category={service.category}
                                            isExpanded={expandedCardTitle === service.title}
                                            onToggle={() => handleCardToggle(service.title)}
                                            delay={index * 0.05}
                                        />
                                    );
                                })
                            ) : (
                                <div className="no-results">
                                    <FiMapPin className="no-results-icon" />
                                    <h3>لا توجد خدمات في هذا التصنيف</h3>
                                    <p>حاول اختيار تصنيف آخر أو تصفح جميع الخدمات</p>
                                    <button 
                                        className="btn-services btn-services-secondary"
                                        onClick={() => setActiveFilter('all')}
                                    >
                                        عرض جميع الخدمات
                                    </button>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Custom Package CTA - Simplified */}
            <section className="custom-cta-section">
                <div className="container">
                    <div className="cta-box">
                        <div className="cta-content">
                            <h2>رحلات مخصصة</h2>
                            <p>نصمم لك رحلة خاصة تناسب ميزانيتك واهتماماتك بالتفصيل</p>
                            <Link to="/contact" className="btn-services btn-services-primary btn-large">
                                اطلب رحلة خاصة
                            </Link>
                        </div>
                        <div className="cta-image">
                            <LazyImage src="/hero-bg.jpg" alt="رحلة مخصصة" />
                            <div className="image-overlay"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
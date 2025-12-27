import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ExpandableServiceCard from '../components/common/ExpandableServiceCard';
import { allServices } from '../data/services';
import { 
    FiAward, FiUsers, FiClock, FiChevronDown, FiGlobe, 
    FiFileText, FiMap, FiSearch, FiPhone, FiSmile 
} from 'react-icons/fi';
import { 
    TbPlane, TbBuilding, TbMap, TbBus, TbShip, 
    TbLanguage, TbBuildingMosque, TbTicket 
} from 'react-icons/tb';
import LazyImage from '../components/common/LazyImage';
import './Services.css';

const Services = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedCardTitle, setExpandedCardTitle] = useState(null);

    // Filter Categories
    const filters = useMemo(() => ([
        { id: 'all', label: 'جميع الخدمات', icon: <FiAward /> },
        { id: 'flights', label: 'حجوزات طيران', icon: <TbPlane /> },
        { id: 'hotels', label: 'فنادق وإقامة', icon: <TbBuilding /> },
        { id: 'visa', label: 'تأشيرات', icon: <FiGlobe /> },
        { id: 'tours', label: 'برامج سياحية', icon: <TbMap /> },
        { id: 'hajj', label: 'حج وعمرة', icon: <TbBuildingMosque /> },
        { id: 'transport', label: 'نقل ومواصلات', icon: <TbBus /> },
        { id: 'other', label: 'خدمات أخرى', icon: <TbTicket /> } // Grouped smaller cats
    ]), []);

    // Helper to group specific categories into 'other' if needed
    const getCategory = (cat) => {
        const mainCats = ['flights', 'hotels', 'visa', 'tours', 'hajj', 'transport'];
        return mainCats.includes(cat) ? cat : 'other';
    };

    const filteredServices = useMemo(() => {
        const data = Array.isArray(allServices) ? allServices : [];
        if (activeFilter === 'all') return data;
        return data.filter(service => getCategory(service.category) === activeFilter);
    }, [activeFilter]);

    const handleCardToggle = (title) => {
        setExpandedCardTitle(expandedCardTitle === title ? null : title);
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="services-page-premium">
            {/* --- Hero Section --- */}
            <div className="services-hero-modern">
                <div className="hero-bg-layer">
                    <div className="hero-blob blob-1"></div>
                    <div className="hero-blob blob-2"></div>
                </div>
                
                <div className="container relative z-10">
                    <div className="hero-content-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <span className="hero-badge-pill">خدمات متكاملة</span>
                            <h1 className="hero-title-lg">
                                وجهتك الأولى <br />
                                <span className="text-gradient-gold">لكل تفاصيل السفر</span>
                            </h1>
                            <p className="hero-desc-lg">
                                نجمع لك العالم في مكان واحد. من تذاكر الطيران إلى أدق تفاصيل إقامتك، 
                                نحن نعتني بكل خطوة لتستمتع بالرحلة.
                            </p>
                        </motion.div>
                    </div>
                </div>
                
                {/* Decorative Wave */}
                <div className="hero-wave">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>

            {/* --- Sticky Filter Bar --- */}
            <div className="filter-sticky-wrapper">
                <div className="container">
                    <div className="filter-glass-bar">
                        <div className="filter-scroll-container">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    className={`filter-pill ${activeFilter === filter.id ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(filter.id)}
                                >
                                    <span className="filter-icon">{filter.icon}</span>
                                    <span>{filter.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Services Grid --- */}
            <section className="section services-grid-section">
                <div className="container">
                    <div className="results-header">
                        <h3>عرض {filteredServices.length} خدمة متاحة</h3>
                        {activeFilter !== 'all' && (
                            <button className="clear-filter" onClick={() => setActiveFilter('all')}>
                                عرض الكل
                            </button>
                        )}
                    </div>

                    <motion.div 
                        className="services-grid-layout"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={activeFilter} // Re-trigger animation on filter change
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredServices.map((service, index) => (
                                <motion.div key={service.title + index} variants={itemVariants} layout>
                                    <ExpandableServiceCard
                                        title={service.title}
                                        tagline={service.tagline}
                                        icon={service.icon}
                                        detailedDescription={service.detailedDescription}
                                        features={service.features}
                                        isExpanded={expandedCardTitle === service.title}
                                        onToggle={() => handleCardToggle(service.title)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredServices.length === 0 && (
                        <div className="empty-state-modern">
                            <FiSearch size={48} />
                            <h3>لا توجد خدمات مطابقة</h3>
                            <p>جرب اختيار تصنيف آخر</p>
                        </div>
                    )}
                </div>
            </section>

            {/* --- Process Section (How it works) --- */}
            <section className="section process-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-tag">كيف نعمل</span>
                        <h2 className="section-title">رحلتك تبدأ بخطوات بسيطة</h2>
                    </div>

                    <div className="process-steps">
                        <div className="process-step">
                            <div className="step-number">01</div>
                            <div className="step-icon"><FiSearch /></div>
                            <h3>اختر خدمتك</h3>
                            <p>تصفح قائمة خدماتنا الشاملة واختر ما يناسب احتياجات سفرك.</p>
                        </div>
                        <div className="process-line"></div>
                        <div className="process-step">
                            <div className="step-number">02</div>
                            <div className="step-icon"><FiPhone /></div>
                            <h3>تواصل معنا</h3>
                            <p>تحدث مع مستشارينا عبر الواتساب أو الهاتف لتأكيد التفاصيل.</p>
                        </div>
                        <div className="process-line"></div>
                        <div className="process-step">
                            <div className="step-number">03</div>
                            <div className="step-icon"><FiSmile /></div>
                            <h3>سافر باطمئنان</h3>
                            <p>استلم حجوزاتك وانطلق في رحلتك ونحن معك في كل خطوة.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Premium CTA --- */}
            <section className="premium-cta-wrapper">
                <div className="container">
                    <div className="premium-cta-card">
                        <div className="cta-bg-image">
                            <LazyImage src="/hero-bg.jpg" alt="Travel" />
                            <div className="cta-overlay"></div>
                        </div>
                        <div className="cta-content-inner">
                            <h2>لم تجد ما تبحث عنه؟</h2>
                            <p>نحن متخصصون في تصميم الرحلات المخصصة. أخبرنا عن حلمك، ونحن سنحوله إلى حقيقة.</p>
                            <div className="cta-actions">
                                <Link to="/contact" className="btn btn-primary btn-lg border-white">
                                    تواصل مع مستشار سياحي
                                </Link>
                                <a href="https://wa.me/967779717177" target="_blank" rel="noreferrer" className="btn btn-outline text-white border-white hover-white">
                                    راسلنا عبر واتساب
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
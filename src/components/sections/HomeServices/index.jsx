import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiMap, FiCheckCircle, FiGlobe } from 'react-icons/fi';
import './HomeServices.css';
import LazyImage from '../../common/LazyImage';

const servicesList = [
    {
        id: 'flights',
        icon: <FiGlobe />,
        title: 'حجوزات طيران',
        description: 'أفضل الأسعار على جميع خطوط الطيران العالمية مع خيارات مرنة.',
        image: '/flight.jpg',
        features: ['مقارنة أسعار لحظية', 'تعديل مرن للحجز', 'دعم 24/7']
    },
    {
        id: 'hotels',
        icon: <FiBriefcase />,
        title: 'فنادق ومنتجعات',
        description: 'إقامة فاخرة في أرقى الفنادق والمنتجعات حول العالم.',
        image: '/hotel.jpg',
        features: ['فنادق 5 نجوم', 'إلغاء مجاني', 'عروض حصرية']
    },
    {
        id: 'tours',
        icon: <FiMap />,
        title: 'برامج سياحية',
        description: 'جولات سياحية متكاملة تشمل المواصلات والمرشدين السياحيين.',
        image: '/hero-bg.jpg',
        features: ['مرشدين محليين', 'برامج مخصصة', 'شامل المواصلات']
    },
    {
        id: 'visa',
        icon: <FiCheckCircle />,
        title: 'تأشيرات سفر',
        description: 'ننهي إجراءات التأشيرة نيابة عنك لجميع الوجهات.',
        image: '/cairo.jpg',
        features: ['نسبة قبول عالية', 'سرعة في الإنجاز', 'استشارات مجانية']
    }
];

const HomeServices = () => {
    const [activeService, setActiveService] = useState(servicesList[0]);

    return (
        <section className="section home-services-section">
            <div className="container">
                <div className="section-header text-center mb-xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="section-tag"
                    >
                        خدماتنا
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                    >
                        تجربة سفر <span className="text-gradient">متكاملة</span>
                    </motion.h2>
                    <p className="section-subtitle">كل ما تحتاجه لرحلتك في مكان واحد، بخدمة تليق بك</p>
                </div>

                <div className="services-showcase">
                    {/* Left Column: Interactive List */}
                    <div className="services-list">
                        {servicesList.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`service-list-item ${activeService.id === service.id ? 'active' : ''}`}
                                onMouseEnter={() => setActiveService(service)}
                                onClick={() => setActiveService(service)} // For mobile tap
                            >
                                <div className="service-item-icon">
                                    {service.icon}
                                </div>
                                <div className="service-item-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                                <div className="service-item-arrow">
                                    <FiArrowLeft />
                                </div>
                            </motion.div>
                        ))}

                        <div className="services-cta-mobile">
                            <Link to="/services" className="btn btn-primary w-full">
                                عرض جميع الخدمات
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Visual Preview */}
                    <div className="services-preview">
                        <div className="preview-card-wrapper">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeService.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                    className="preview-image-container"
                                >
                                    <LazyImage
                                        src={activeService.image}
                                        alt={activeService.title}
                                        className="preview-image"
                                    />
                                    <div className="preview-overlay"></div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="preview-content glass">
                                <motion.div
                                    key={activeService.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3>{activeService.title}</h3>
                                    <ul className="preview-features">
                                        {activeService.features.map((feature, idx) => (
                                            <li key={idx}>
                                                <span className="dot"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/contact" className="btn btn-sm btn-primary">
                                        احجز الآن
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeServices;

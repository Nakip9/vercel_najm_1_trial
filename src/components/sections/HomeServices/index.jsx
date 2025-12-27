import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiMap, FiCheckCircle, FiGlobe } from 'react-icons/fi';
import './HomeServices.css';
import LazyImage from '../../common/LazyImage';

const servicesList = [
    {
        id: 'musaned',
        icon: <FiGlobe />,
        title: 'تفاويض العمالة عبر مساند',
        description: 'نقدم حلولاً متكاملة لإصدار وتوثيق تفاويض تأشيرات العمالة المنزلية عبر منصة مساند بدقة وعناية.',
        image: '/flight.jpg',
        features: ['توثيق فوري ومعتمد', 'ربط آلي مع منصة مساند', 'دعم فني متكامل']
    },
    {
        id: 'visit-visa',
        icon: <FiBriefcase />,
        title: 'تأشيرات الزيارة العائلية',
        description: 'نسهل لك إجراءات جمع شمل العائلة من خلال استخراج تأشيرات الزيارة للأقارب من الدرجة الأولى.',
        image: '/hotel.jpg',
        features: ['مراجعة دقيقة للمستندات', 'سرعة عالية في الإنجاز', 'نسبة قبول مرتفعة']
    },
    {
        id: 'manpower',
        icon: <FiMap />,
        title: 'استقدام الأيدي العاملة',
        description: 'توفير وتخليص معاملات الكوادر المهنية لمختلف التخصصات بموجب الترخيص الرسمي رقم 19.',
        image: '/hero-bg.jpg',
        features: ['كوادر مهنية مؤهلة', 'إجراءات نظامية وقانونية', 'خبرة واسعة في الاستقدام']
    },
    {
        id: 'residency',
        icon: <FiCheckCircle />,
        title: 'خدمات الإقامة العائلية',
        description: 'متخصصون في إنهاء معاملات استقدام الزوجة والأبناء للإقامة الدائمة وربطها بملف رب الأسرة.',
        image: '/cairo.jpg',
        features: ['استقرار عائلي متكامل', 'متابعة حثيثة للطلبات', 'حلول للمعاملات المتعثرة']
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
                        حلول وخدمات <span className="text-gradient">متكاملة</span>
                    </motion.h2>
                    <p className="section-subtitle">نضع خبرتنا بين يديك لتسهيل كافة إجراءاتك وتأشيراتك في مكان واحد</p>
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
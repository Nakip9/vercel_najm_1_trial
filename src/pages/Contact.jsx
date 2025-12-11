import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi';
import { CONTACT_INFO } from '../constants/company';
import LazyImage from '../components/common/LazyImage';
import './Contact.css';

const Contact = () => {
    // Contact methods for floating icons
    const handleMapClick = (e) => {
        e.preventDefault();
        const mapSection = document.querySelector('.contact-map-wrapper');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const contactMethods = [
        { icon: <FiPhone />, label: 'اتصل بنا', method: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}` },
        { icon: <FiMail />, label: 'راسلنا', method: `mailto:${CONTACT_INFO.email}` },
        { icon: <FiMapPin />, label: 'موقعنا', method: 'https://maps.google.com/?q=شارع+حدّة،+صنعاء،+اليمن', onClick: handleMapClick }
    ];

    return (
        <div className="contact-page">
            {/* Enhanced Hero Section */}
            <section className="contact-hero" aria-label="تواصل معنا">
                <div className="contact-hero-background">
                    <LazyImage 
                        src="/dubai.jpg" 
                        alt="دبي - خلفية" 
                        className="contact-hero-image"
                    />
                    <div className="contact-hero-overlay"></div>
                    <div className="contact-hero-pattern"></div>
                </div>
                
                <div className="container contact-hero-content">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="contact-hero-badge"
                    >
                        <FiMapPin aria-hidden="true" />
                        <span>زورنا في صنعاء</span>
                    </motion.div>

                    {/* Main Title with Animated Underline */}
                    <div className="contact-title-wrapper">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="contact-hero-title"
                        >
                            تواصل معنا
                            <motion.span
                                className="contact-title-underline"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                            />
                        </motion.h1>
                    </div>

                    {/* Floating Contact Methods */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="contact-methods-floating"
                        aria-label="طرق التواصل"
                    >
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={index}
                                href={method.method}
                                className="contact-method-icon"
                                onClick={method.onClick}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.1 }}
                                aria-label={method.label}
                                target={method.method.startsWith('http') ? '_blank' : undefined}
                                rel={method.method.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                {method.icon}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="contact-hero-subtitle"
                    >
                        نحن هنا للإجابة على استفساراتك ومساعدتك في تخطيط رحلتك القادمة
                    </motion.p>
                </div>
            </section>

            <div className="container section">
                <div className="contact-grid">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="contact-info-wrapper"
                    >
                        <h2 className="contact-title">معلومات الاتصال</h2>
                        <p className="contact-desc">يمكنك التواصل معنا عبر القنوات التالية أو زيارة مقرنا الرئيسي.</p>

                        <div className="contact-cards-grid">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="contact-card"
                            >
                                <div className="contact-card-icon">
                                    <FiPhone />
                                </div>
                                <h4 className="contact-card-title">الهاتف</h4>
                                <div className="contact-card-content">
                                    <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="contact-link">{CONTACT_INFO.phone}</a>
                                    {CONTACT_INFO.whatsapp && (
                                        <a href={`tel:${CONTACT_INFO.whatsapp.replace(/\s/g, '')}`} className="contact-link">{CONTACT_INFO.whatsapp}</a>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="contact-card"
                            >
                                <div className="contact-card-icon">
                                    <FiMail />
                                </div>
                                <h4 className="contact-card-title">البريد الإلكتروني</h4>
                                <div className="contact-card-content">
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="contact-link">{CONTACT_INFO.email}</a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="contact-card"
                            >
                                <div className="contact-card-icon">
                                    <FiMapPin />
                                </div>
                                <h4 className="contact-card-title">العنوان</h4>
                                <div className="contact-card-content">
                                    <p>{CONTACT_INFO.address}</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="contact-card"
                            >
                                <div className="contact-card-icon">
                                    <FiClock />
                                </div>
                                <h4 className="contact-card-title">ساعات العمل</h4>
                                <div className="contact-card-content">
                                    <p>{CONTACT_INFO.workingHours}</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Interactive Map Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="contact-map-wrapper"
                    >
                        <h2 className="contact-title">موقعنا على الخريطة</h2>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3218.4999999999995!2d44.196999!3d15.369999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTVcxYTHpTMgNDJow4!5e0!3m2!1sar!2sye!4v1630000000000!5m2!1sar!2sye"
                                width="100%"
                                height="450"
                                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="موقعنا في شارع حدّة، صنعاء، اليمن"
                            ></iframe>
                        </div>
                        <div className="map-info">
                            <div className="map-pin-icon">
                                <FiMapPin />
                            </div>
                            <div>
                                <h4>شارع حدّة، صنعاء</h4>
                                <p>اليمن - سهل الوصول والمواقف المتاحة</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

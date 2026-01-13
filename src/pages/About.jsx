import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiArrowLeft,
    FiTarget,
    FiAward,
    FiUsers,
    FiTrendingUp,
    FiMapPin,
    FiSmile,
    FiCheckCircle,
    FiClock,
    FiBriefcase
} from 'react-icons/fi';
import LazyImage from '../components/common/LazyImage';
import './About.css';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // Stagger animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const scrollToContent = () => {
        const storySection = document.querySelector('.story-section');
        if (storySection) {
            storySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="about-modern" ref={containerRef}>
            {/* --- Section 1: Parallax Hero --- */}
            <header className="about-hero-modern">
                <motion.div style={{ y }} className="hero-bg-parallax">
                    <LazyImage 
                        src="/hero-bg.jpg" 
                        alt="خلفية النجم الأزرق" 
                        className="parallax-img" 
                    />
                    <div className="hero-overlay-gradient"></div>
                </motion.div>

                <div className="container hero-content-modern">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="hero-text-wrapper"
                    >
                        <motion.span variants={itemVariants} className="hero-badge-glass">
                            خبرة منذ 2008
                        </motion.span>
                        <motion.h1 variants={itemVariants} className="hero-title-modern">
                            أكثر من وكالة سفر، <br />
                            <span className="text-gradient">شريكك في كل مغامرة.</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="hero-desc-modern">
                            في "النجم الأزرق"، نرى السفر كرحلة اكتشاف وليس مجرد تنقل من مكان إلى آخر.
                            ندمج بين الإرث الراسخ والتفكير الحديث لنصنع لك لحظات لا تُمحى من الذاكرة.
                        </motion.p>
                    </motion.div>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    className="scroll-mouse"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    onClick={scrollToContent}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="wheel"></div>
                </motion.div>
            </header>

            {/* --- Section 2: The Story (Image Collage) --- */}
            <section className="section story-section">
                <div className="container">
                    <div className="story-grid">
                        <motion.div 
                            className="story-content"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="section-label">مسيرتنا</span>
                            <h2 className="section-heading">
                                من بدايات متواضعة إلى <br/>
                                <span className="highlight-underline">بوابة شاملة نحو العالم</span>
                            </h2>
                            <p className="story-text">
                                انطلقت رحلتنا من إيمان عميق: كيف نُسهّل السفر ونُحوله إلى تجربة ممتعة؟
                                بدأنا من صنعاء بقصد واضح، وعلى الرغم من العقبات، نجحنا في بناء رابطة وثيقة من الولاء مع زبائننا.
                            </p>
                            <p className="story-text">
                                الآن، وبعد أكثر من خمسة عشر عاماً، نعتز بأننا لا نقدّم خدمة فحسب، بل نكون مستشارين موثوقين
                                لطموحات آلاف المسافرين، نشرع أمامهم الأبواب العالمية بصدق وكفاءة.
                            </p>

                            <div className="story-stats">
                                <div className="story-stat-item">
                                    <span className="stat-num">15+</span>
                                    <span className="stat-label">عاماً من الإتقان</span>
                                </div>
                                <div className="story-stat-item">
                                    <span className="stat-num">50k+</span>
                                    <span className="stat-label">عميل راضٍ</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="story-visuals"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="collage-wrapper">
                                <div className="collage-img-lg">
                                    <LazyImage src="/dubai.jpg" alt="سفر وسياحة" />
                                </div>
                                <div className="collage-img-sm glass-card">
                                    <LazyImage src="/london.jpeg" alt="وجهات عالمية" />
                                    <div className="collage-badge">
                                        <FiTrendingUp />
                                        <span>تطور دائم</span>
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className="circle-decor"></div>
                                <div className="dots-decor"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Section 3: Values (Modern Bento Grid) --- */}
            <section className="section values-section-modern">
                <div className="container">
                    <div className="section-header-center mb-5">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="section-tag"
                        >
                            ما نقدمه لك
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="section-heading"
                        >
                            قيمٌ نعتز بها وخدماتٌ نتميز بها
                        </motion.h2>
                    </div>

                    <div className="bento-grid-modern">
                        {/* 1. Vision Card (Featured) */}
                        <motion.div
                            className="bento-item vision-card"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="card-overlay"></div>
                            <div className="bento-content relative z-10">
                                <div className="icon-wrapper glass-icon mb-4">
                                    <FiTarget />
                                </div>
                                <h3>طموحنا يحدده التميز</h3>
                                <p>نسعى لأن نكون الوجهة المفضلة لكل مسافر عربي، من خلال ابتكار حلول سفر تدمج الرقي، اليسر، والقيمة التنافسية.</p>
                            </div>
                            <div className="bg-pattern"></div>
                        </motion.div>

                        {/* 2. Trust Card (Vertical) */}
                        <motion.div
                            className="bento-item trust-card"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="trust-badge">
                                <FiCheckCircle /> 100% وضوح
                            </div>
                            <div className="bento-content mt-auto">
                                <div className="icon-wrapper mb-3 text-amber-500">
                                    <FiAward size={32} />
                                </div>
                                <h3>الثقة أساس عملنا</h3>
                                <p>بدون تكاليف مخفية أو وعود مبالغ فيها. الصرامة في الأداء هي ميزتنا، وما نلتزم به هو ما تحصل عليه حرفياً.</p>
                            </div>
                        </motion.div>

                        {/* 3. Team Card */}
                        <motion.div
                            className="bento-item team-card"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="icon-wrapper text-blue-600">
                                    <FiUsers />
                                </div>
                                <span className="tiny-tag">دعم على مدار الساعة</span>
                            </div>
                            <h3>كفاءة وخبرة</h3>
                            <p>خبراء متخصصون على أتم الاستعداد لمساعدتك في أي لحظة.</p>
                        </motion.div>

                        {/* 4. Global Coverage */}
                        <motion.div
                            className="bento-item map-card"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="bento-content">
                                <div className="icon-wrapper text-teal-600 mb-3">
                                    <FiMapPin />
                                </div>
                                <h3>شبكة عالمية واسعة</h3>
                                <p>تحالفات قوية مع شركاء في خمسين دولة وأكثر.</p>
                            </div>
                            <div className="map-dots-decoration"></div>
                        </motion.div>

                        {/* 5. Comfort/Service */}
                        <motion.div
                            className="bento-item service-card"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="bento-content">
                                <div className="icon-wrapper text-rose-500 mb-3">
                                    <FiSmile />
                                </div>
                                <h3>تجربة سلسة ومريحة</h3>
                                <p>نراعي أصغر التفاصيل كي تستمتع برحلتك خالياً من أي هموم.</p>
                            </div>
                        </motion.div>

                        {/* 6. Hajj & Umrah Service (Featured) */}
                        <motion.div
                            className="bento-item hajj-umrah-card"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="bento-content relative z-10">
                                <div className="icon-wrapper mb-4">
                                    <FiClock size={32} />
                                </div>
                                <h3>استخراج تأشيرات الحج والعمرة</h3>
                                <p>
                                    نسهل عليك رحلتك الروحانية بتقديم دعم شامل للحصول على تصريحات الحج والعمرة.
                                    نضمن لك تجربة سلسة وفعّالة تُزيل عنك عناء الإجراءات الإدارية، فنقدم لك
                                    أسرع وسيلة موثوقة للوصول إلى أقدس البقاع في المملكة العربية السعودية.
                                </p>
                            </div>
                            <div className="hajj-pattern"></div>
                        </motion.div>

                        {/* 7. Visa Sales Service */}
                        <motion.div
                            className="bento-item visa-sales-card"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="visa-badge">
                                <span>تراخيص رسمية</span>
                            </div>
                            <div className="bento-content">
                                <div className="icon-wrapper mb-3">
                                    <FiBriefcase />
                                </div>
                                <h3>تأشيرات العمل والإقامة</h3>
                                <p>
                                    نتميز في تقديم حلول دخول قانونية للمملكة العربية السعودية، سواء لغرض العمل
                                    أو الإقامة. تتوفر لدينا خيارات متنوعة تشمل الإقامات المهنية قصيرة وطويلة الأمد،
                                    بالإضافة إلى تأشيرات العمالة المنزلية وغيرها من الفئات المهنية بجميع التخصصات المطلوبة.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Section 4: Modern CTA --- */}
            <section className="cta-modern-section">
                <div className="container">
                    <div className="cta-modern-card">
                        <div className="cta-modern-content">
                            <h2>متشوق لبدء مغامرتك التالية؟</h2>
                            <p>تولّى نحن التخطيط، بينما تستعد أنت للانطلاق.</p>
                            <div className="cta-buttons">
                                <Link to="/contact" className="btn btn-primary btn-lg border-white">
                                    ابداً الآن <FiArrowLeft />
                                </Link>
                                <Link to="/services" className="btn btn-outline btn-lg text-white border-white hover-white">
                                    اطلع على خدماتنا
                                </Link>
                            </div>
                        </div>
                        <div className="cta-pattern-overlay"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
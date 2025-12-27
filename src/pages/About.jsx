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
    FiCheckCircle
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
                            منذ 2008
                        </motion.span>
                        <motion.h1 variants={itemVariants} className="hero-title-modern">
                            لسنا مجرد وكالة سفر، <br />
                            <span className="text-gradient">نحن رفقاء رحلتك.</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="hero-desc-modern">
                            في "النجم الأزرق"، نؤمن أن السفر ليس مجرد انتقال من مكان لآخر، بل هو فن صناعة الذكريات. 
                            نجمع بين الخبرة العريقة والرؤية العصرية لنقدم لك تجربة لا تُنسى.
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
                            <span className="section-label">قصتنا</span>
                            <h2 className="section-heading">
                                من مكتب صغير إلى <br/>
                                <span className="highlight-underline">نافذة على العالم</span>
                            </h2>
                            <p className="story-text">
                                بدأت حكايتنا بشغف بسيط: كيف يمكننا جعل السفر أسهل وأكثر متعة؟ 
                                انطلقنا من صنعاء برؤية واضحة، ورغم التحديات، استطعنا أن نبني جسراً من الثقة مع عملائنا.
                            </p>
                            <p className="story-text">
                                اليوم، وبعد مرور أكثر من 15 عاماً، نفخر بأننا لسنا مجرد مقدمي خدمة، بل مستشارين مؤتمنين 
                                لأحلام آلاف المسافرين، نفتح لهم أبواب العالم بمصداقية واحترافية.
                            </p>
                            
                            <div className="story-stats">
                                <div className="story-stat-item">
                                    <span className="stat-num">15+</span>
                                    <span className="stat-label">سنة خبرة</span>
                                </div>
                                <div className="story-stat-item">
                                    <span className="stat-num">50k+</span>
                                    <span className="stat-label">عميل سعيد</span>
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
                                        <span>نمو مستمر</span>
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
                            لماذا تختارنا؟
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="section-heading"
                        >
                            قيمٌ نلتزم بها في كل رحلة
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
                                <h3>رؤيتنا للمستقبل</h3>
                                <p>أن نكون الخيار الأول للمسافر العربي، عبر تقديم حلول سفر مبتكرة تجمع بين الفخامة، السهولة، والسعر المناسب.</p>
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
                                <FiCheckCircle /> 100% شفافية
                            </div>
                            <div className="bento-content mt-auto">
                                <div className="icon-wrapper mb-3 text-amber-500">
                                    <FiAward size={32} />
                                </div>
                                <h3>المصداقية أولاً</h3>
                                <p>لا رسوم خفية، ولا وعود زائفة. الشفافية هي عملتنا، وما نتفق عليه هو ما تحصل عليه بالضبط.</p>
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
                                <span className="tiny-tag">دعم 24/7</span>
                            </div>
                            <h3>فريق محترف</h3>
                            <p>مستشارون ذوو خبرة عالية جاهزون لخدمتك في أي وقت.</p>
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
                                <h3>تغطية عالمية</h3>
                                <p>شبكة واسعة من الشركاء في أكثر من 50 دولة.</p>
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
                                <h3>راحة بالك</h3>
                                <p>نهتم بأدق التفاصيل الصغيرة لتستمتع برحلتك دون قلق.</p>
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
                            <h2>هل أنت مستعد لمغامرتك القادمة؟</h2>
                            <p>دعنا نخطط لرحلتك بينما تتفرغ أنت لتجهيز حقائبك.</p>
                            <div className="cta-buttons">
                                <Link to="/contact" className="btn btn-primary btn-lg border-white">
                                    ابدأ التخطيط الآن <FiArrowLeft />
                                </Link>
                                <Link to="/services" className="btn btn-outline btn-lg text-white border-white hover-white">
                                    استكشف خدماتنا
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
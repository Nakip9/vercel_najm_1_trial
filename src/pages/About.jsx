import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    FiChevronRight,
    FiArrowLeft,
    FiStar,
    FiUsers,
    FiGlobe,
    FiAward
} from 'react-icons/fi';
import './About.css';

const About = () => {
    const [activeSection, setActiveSection] = useState('story');
    const scrollToContent = () => {
    const sectionNav = document.querySelector('.section-nav');
    if (sectionNav) {
        sectionNav.scrollIntoView({ behavior: 'smooth' });
    }
};
    const sections = [
        { id: 'story', title: 'قصتنا', number: '01' },
        { id: 'values', title: 'قيمنا', number: '02' },
        { id: 'team', title: 'فريقنا', number: '03' }
    ];

    return (
        <div className="about-minimal">
            {/* Hero Section - Minimalist */}
            <section className="about-hero-minimal">
                <div className="hero-background">
                    <div className="gradient-overlay"></div>
                    <div className="grid-pattern"></div>
                </div>
                
                <div className="container">
                    <div className="hero-content-wrapper">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hero-breadcrumb"
                        >
                            <Link to="/" className="breadcrumb-link">
                                <FiArrowLeft />
                                الرئيسية
                            </Link>
                            <span className="breadcrumb-separator">/</span>
                            <span className="breadcrumb-current">من نحن</span>
                        </motion.div>

                        <div className="hero-main">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="hero-text"
                            >
                            <h1 className="hero-title">
                                <span className="title-line title-line-1">اكتشف قصة نجاحنا</span>
                                <span className="title-line title-line-2">
                                    النجم الأزرق
                                    <span className="title-highlight">.<br />للرحلات</span> {/* Added <br /> to break the line */}
                                </span>
                            </h1>

                                
                                <p className="hero-subtitle">
                                    منذ 2008، نرسم مسارات السفر الأكثر تفرداً 
                                    وراحةً لعملائنا. نحن أكثر من مجرد وكالة سفر - 
                                    نحن شركاؤك في رحلتك نحو الذكريات التي لا تُنسى.
                                </p>

                                <div className="hero-stats">
                                    <div className="stat">
                                        <span className="stat-number">15+</span>
                                        <span className="stat-label">سنة خبرة</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-number">50K+</span>
                                        <span className="stat-label">عميل سعيد</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-number">120+</span>
                                        <span className="stat-label">وجهة</span>
                                    </div>
                                </div>

                                <div className="hero-actions">
                                    <Link to="/contact" className="btn btn-primary">
                                        ابدأ رحلتك
                                        <FiChevronRight />
                                    </Link>
                                    <button className="btn-text" onClick={scrollToContent}>
                                        تعرف أكثر
                                        <span className="arrow">↓</span>
                                    </button>
                                </div>
                                
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="hero-visual"
                            >
                                <div className="visual-frame">
                                    <div className="frame-content">
                                        <div className="frame-item item-1">
                                            <FiStar />
                                            <span>أفضل خدمة</span>
                                        </div>
                                        <div className="frame-item item-2">
                                            <FiUsers />
                                            <span>فريق متخصص</span>
                                        </div>
                                        <div className="frame-item item-3">
                                            <FiGlobe />
                                            <span>عالمية</span>
                                        </div>
                                        <div className="frame-item item-4">
                                            <FiAward />
                                            <span>ضمان الجودة</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <section className="section-nav">
                <div className="container">
                    <div className="nav-tabs">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={`nav-tab ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <span className="tab-number">{section.number}</span>
                                <span className="tab-title">{section.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="content-sections">
                {/* Story Section */}
                {activeSection === 'story' && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="content-section"
                    >
                        <div className="container">
                            <div className="section-content">
                                <div className="content-text">
                                    <h2 className="section-title">من مكتب صغير إلى علامة رائدة</h2>
                                    <p className="section-description">
                                        بدأنا في 2008 بمهمة واضحة: تبسيط السفر وجعله تجربة استثنائية. 
                                        اليوم، نحن شريكك الموثوق لأي رحلة، مهما كانت وجهتك.
                                    </p>
                                    <div className="content-points">
                                        <div className="point">
                                            <div className="point-number">01</div>
                                            <div className="point-content">
                                                <h3>البداية</h3>
                                                <p>مكتب صغير بحلم كبير</p>
                                            </div>
                                        </div>
                                        <div className="point">
                                            <div className="point-number">02</div>
                                            <div className="point-content">
                                                <h3>التطور</h3>
                                                <p>شراكات استراتيجية عالمية</p>
                                            </div>
                                        </div>
                                        <div className="point">
                                            <div className="point-number">03</div>
                                            <div className="point-content">
                                                <h3>الحاضر</h3>
                                                <p>وكالة رائدة مع فريق متخصص</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Values Section */}
                {activeSection === 'values' && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="content-section"
                    >
                        <div className="container">
                            <div className="section-content">
                                <div className="content-text">
                                    <h2 className="section-title">ما يميزنا</h2>
                                    <p className="section-description">
                                        مبادئنا هي أساس كل خدمة نقدمها. نؤمن أن السفر الجيد يبدأ بقيم راسخة.
                                    </p>
                                    <div className="values-grid">
                                        <div className="value">
                                            <div className="value-icon">✓</div>
                                            <h3>الشفافية</h3>
                                            <p>أسعار واضحة بدون مفاجآت</p>
                                        </div>
                                        <div className="value">
                                            <div className="value-icon">❤</div>
                                            <h3>الاهتمام</h3>
                                            <p>نستمع ونفهم احتياجاتك</p>
                                        </div>
                                        <div className="value">
                                            <div className="value-icon">⚡</div>
                                            <h3>الكفاءة</h3>
                                            <p>حلول سريعة ودقيقة</p>
                                        </div>
                                        <div className="value">
                                            <div className="value-icon">🛡</div>
                                            <h3>الموثوقية</h3>
                                            <p>ثقة بنيت عبر السنين</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Team Section */}
                {activeSection === 'team' && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="content-section"
                    >
                        <div className="container">
                            <div className="section-content">
                                <div className="content-text">
                                    <h2 className="section-title">فريق الخبراء</h2>
                                    <p className="section-description">
                                        محترفون متخصصون في كل مجال من مجالات السفر والسياحة.
                                    </p>
                                    <div className="team-stats">
                                        <div className="team-stat">
                                            <span className="team-number">15+</span>
                                            <span className="team-label">مستشار سياحي</span>
                                        </div>
                                        <div className="team-stat">
                                            <span className="team-number">24/7</span>
                                            <span className="team-label">دعم فني</span>
                                        </div>
                                        <div className="team-stat">
                                            <span className="team-number">10+</span>
                                            <span className="team-label">لغة متاحة</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </div>

            {/* Minimal CTA */}
            <section className="minimal-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>مستعد للسفر؟</h2>
                        <p>تواصل مع مستشارينا اليوم</p>
                        <Link to="/contact" className="btn btn-primary">
                            احجز استشارة مجانية
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
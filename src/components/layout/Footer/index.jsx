import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiLinkedin, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { SOCIAL_LINKS, COMPANY_INFO, CONTACT_INFO } from '../../../constants/company';
import { SiX } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
    const socialMedia = [
        { icon: <SiX />, href: SOCIAL_LINKS.twitter, label: 'X', color: '#000000', className: 'x' },
        { icon: <FiInstagram />, href: SOCIAL_LINKS.instagram, label: 'إنستغرام', color: '#E4405F' },
        { icon: <FiFacebook />, href: SOCIAL_LINKS.facebook, label: 'فيسبوك', color: '#1877F2' },
    ];

    return (    
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Company Info */}
                    <div className="footer-col footer-col-main">
                        <Link to="/" className="footer-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="الرجوع إلى الصفحة الرئيسية">
                            <img 
                                src="/logo_svg.svg" 
                                alt="النجم الأزرق للسياحة والسفر" 
                                className="footer-logo-img"
                                /* Updated attributes to match new CSS max-sizes */
                                width="350"  
                                height="120"
                                loading="lazy" /* Changed to lazy for footer performance */
                            />
                        </Link>
                        <p className="footer-desc">
                            شريكك الموثوق في عالم السفر والسياحة. نقدم لك تجارب سفر استثنائية وخدمات راقية تليق بك.
                        </p>
                        <div className="social-links" role="list" aria-label="روابط التواصل الاجتماعي">
                            {socialMedia.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`social-link ${social.className || ''}`}
                                    aria-label={social.label}
                                    style={{ '--social-color': social.color }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h3 className="footer-title">روابط سريعة</h3>
                        <ul className="footer-links">
                            <li><Link to="/">الرئيسية</Link></li>
                             <li><Link to="/services">خدماتنا</Link></li>   
                            <li><Link to="/about">من نحن</Link></li>
                            <li><Link to="/destinations">الوجهات</Link></li>
                            <li><Link to="/contact">اتصل بنا</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h3 className="footer-title">خدماتنا</h3>
                        <ul className="footer-links">
                            <li><Link to="/services">حجوزات الطيران</Link></li>
                            <li><Link to="/services">حجوزات الفنادق</Link></li>
                            <li><Link to="/services">البرامج السياحية</Link></li>
                            <li><Link to="/services">التأشيرات</Link></li>
                            <li><Link to="/services">السياحة العلاجية</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h3 className="footer-title">تواصل معنا</h3>
                        <ul className="footer-contact" role="list">
                            <li>
                                <FiPhone className="icon" aria-hidden="true" />
                                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} aria-label="اتصل بنا">{CONTACT_INFO.phone}</a>
                            </li>
                            <li>
                                <FiMail className="icon" aria-hidden="true" />
                                <a href={`mailto:${CONTACT_INFO.email}`} aria-label="أرسل بريد إلكتروني">{CONTACT_INFO.email}</a>
                            </li>
                            <li>
                                <FiMapPin className="icon" aria-hidden="true" />
                                <span>{CONTACT_INFO.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>  النجم الأزرق للسفريات والسياحة. جميع الحقوق محفوظة لعام ٢٠٢٦ لدى مندوب التعميدات الخاص بالمكتب.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
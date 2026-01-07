import React, { useState } from 'react';
import './PassportCheck.css';

// --- Sub-Component: Status Result (The Schedule) ---
const StatusResult = ({ result, onReset }) => {
  if (!result) return null;

  // Configuration for different statuses based on your design system
  const getStatusConfig = (status) => {
    const configs = {
      ready: {
        label: 'جاهزة',
        icon: '✓',
        color: 'var(--secondary-teal)',
        message: 'تأشيرتك جاهزة! يمكنك المتابعة مع خطط سفرك.',
      },
      in_embassy: {
        label: 'في السفارة',
        icon: '🏛️',
        color: 'var(--accent-amber)',
        message: 'تم ترحيل معاملتكم الى السفارة وسيتم ابلاغكم في حين وصول الدفعة المؤشرة',
      },
      pending: {
        label: 'تم الاستلام',
        icon: '📋',
        color: 'var(--text-secondary)',
        message: 'تم استلام معاملتكم وسيتم ابلاغكم في حين وصول الدفعة المؤشرة',
      },
      in_aden: {
        label: 'في عدن',
        icon: '📍',
        color: 'var(--primary-blue)',
        message: 'جواز السفر واصل الآن إلى عدن ويتم استكمال الإجراءات.',
      },
    };
    return configs[status] || configs.pending;
  };

  // Not Found State
  if (!result.found) {
    return (
      <div className="status-result">
        <div className="status-card not-found">
          <span className="status-icon-large">🔍</span>
          <h3 className="status-title" style={{ color: 'var(--text-primary)' }}>غير موجود</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{result.message}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sm)', marginBottom: '2rem' }}>
            يرجى التحقق من رقم الجواز أو الاتصال بفريق الدعم.
          </p>
          <button onClick={onReset} className="btn-reset">
            التحقق من جواز آخر
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(result.status);
  const fullName = [result.first_name, result.last_name].filter(Boolean).join(' ');

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('ar-SA', {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const timelineSteps = [
    { key: 'received', title: 'استلام الجواز', desc: 'تم استلام الجواز في الوكالة', date: result.passport_received_date, icon: '📂' },
    { key: 'embassy', title: 'التقديم للسفارة', desc: 'تم تسليم الجواز للسفارة للمعالجة', date: result.embassy_submit_date, icon: '🏛️' },
    { key: 'exit', title: 'الخروج المتوقع', desc: 'الموعد المتوقع لانتهاء المعالجة', date: result.expected_exit_date, icon: '✨' },
  ];

  const getStepStatus = (step, index) => {
    if (step.date) {
      const stepDate = new Date(step.date);
      const today = new Date();
      if (stepDate < today) return 'completed';
      return 'active';
    }
    if (result.status === 'ready') return 'completed';
    if (result.status === 'in_embassy' || result.status === 'in_aden') {
      if (index === 0) return 'completed';
      return 'active';
    }
    if (index === 0) return 'active';
    return 'pending';
  };

  return (
    <div className="status-result">
      <div className="status-card found">
        
        {/* Header */}
        <div className="status-header-premium">
          <h2 className="status-title" style={{ color: statusConfig.color }}>
            {statusConfig.icon} {statusConfig.label}
          </h2>
          {fullName && <p className="status-name">مرحباً، {fullName}</p>}
          <div className="premium-badge">جواز رقم: {result.passport_number}</div>
          
          {result.visa_type && (
            <div style={{display:'block'}}>
              <div className="visa-type-container">
                <span className="visa-type-label">نوع التأشيرة</span>
                <span className="visa-type-value">{result.visa_type}</span>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Schedule Timeline */}
        <div className="timeline-container">
          {timelineSteps.map((step, index) => {
            const stepStatus = getStepStatus(step, index);
            const formattedDate = formatDate(step.date);
            
            return (
              <div key={step.key} className={`timeline-step ${stepStatus}`}>
                <div className="timeline-marker">
                  {stepStatus === 'completed' ? '✓' : ''}
                </div>
                <div className="timeline-content">
                  <span className="timeline-date">{formattedDate || '--/--/----'}</span>
                  <h4 className="timeline-title">{step.title}</h4>
                  <p className="timeline-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="status-body">
          {statusConfig.message && <p className="status-message">{statusConfig.message}</p>}
          {result.admin_notes && (
            <div className="admin-notes">
              <strong>ملاحظة من الإدارة:</strong> {result.admin_notes}
            </div>
          )}
        </div>

        <button onClick={onReset} className="btn-reset">
          فحص جواز آخر
        </button>
      </div>
    </div>
  );
};

// --- Main Parent Component ---
const PassportCheck = () => {
  const [passportNumber, setPassportNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Mock API Call - Replace with your real fetch
  const handleCheck = async (e) => {
    e.preventDefault();
    if (!passportNumber.trim()) {
      setError('يرجى إدخال رقم الجواز');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    // Simulator for demo purposes
    setTimeout(() => {
      // Simulate Found Result
      setResult({
        found: true,
        status: 'in_embassy', // try: 'ready', 'in_aden', 'pending'
        passport_number: passportNumber,
        first_name: 'محمد',
        last_name: 'أحمد',
        visa_type: 'عمل',
        passport_received_date: '2023-10-01',
        embassy_submit_date: null,
        expected_exit_date: '2023-11-15',
        admin_notes: '',
      });
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
    setPassportNumber('');
    setError('');
  };

  return (
    <section className="passport-check-section">
      <div className="passport-check-wrapper">
        
        {/* Hide header when result is shown to save space on mobile */}
        {!result && (
          <div className="passport-check-header">
            <h2 className="section-title">فحص حالة الجواز</h2>
            <p className="section-subtitle">
              أدخل رقم الجواز للتحقق من حالة التأشيرة ومتابعة مراحل المعالجة
            </p>
          </div>
        )}

        {/* Main Card */}
        <div className="passport-check-card">
          {!result ? (
            <form onSubmit={handleCheck} className="passport-check-form">
              <div className="form-group">
                <label className="form-label">رقم الجواز</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="أدخل رقم الجواز هنا..."
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              <button type="submit" className="btn-check" disabled={loading}>
                {loading ? <div className="spinner" /> : 'تحقق الآن'}
              </button>
            </form>
          ) : (
            <StatusResult result={result} onReset={handleReset} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PassportCheck;
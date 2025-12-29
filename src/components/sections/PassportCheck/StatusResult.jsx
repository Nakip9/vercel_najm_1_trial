import './PassportCheck.css';

const StatusResult = ({ result, onReset }) => {
  if (!result) return null;

  const getStatusConfig = (status) => {
    const configs = {
      ready: {
        label: 'جاهزة',
        icon: '✓',
        color: 'var(--secondary-teal)',
        bgColor: 'rgba(20, 184, 166, 0.1)',
        message: 'تأشيرتك جاهزة! يمكنك المتابعة مع خطط سفرك.',
      },
      in_embassy: {
        label: 'في السفارة',
        icon: '🏛️',
        color: 'var(--accent-amber)',
        bgColor: 'rgba(245, 158, 11, 0.1)',
        message: 'جواز السفر الخاص بك حالياً في السفارة لإتمام الإجراءات.',
      },
      pending: {
        label: 'معلقة',
        icon: '📋',
        color: 'var(--text-secondary)',
        bgColor: 'rgba(71, 85, 105, 0.1)',
        message: 'طلب التأشيرة الخاص بك معلق. سنقوم بتحديثك بمجرد بدء المعالجة.',
      },
      rejected: {
        label: 'مرفوضة',
        icon: '✗',
        color: 'var(--accent-coral)',
        bgColor: 'rgba(236, 72, 153, 0.1)',
        message: 'للأسف، تم رفض طلب التأشيرة الخاص بك. يرجى الاتصال بنا لمزيد من المعلومات.',
      },
    };

    return configs[status] || configs.pending;
  };

  if (!result.found) {
    return (
      <div className="status-result">
        <div className="status-card not-found">
          <div className="status-icon">🔍</div>
          <h3 className="status-title">غير موجود</h3>
          <p className="status-message">{result.message}</p>
          <p className="status-help">
            يرجى التحقق من رقم الجواز أو الاتصال بفريق الدعم للحصول على المساعدة.
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
  
  // Format dates helper
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Timeline steps configuration
  const timelineSteps = [
    {
      key: 'received',
      title: 'استلام الجواز',
      desc: 'تم استلام الجواز في الوكالة',
      date: result.passport_received_date,
      icon: '📂',
    },
    {
      key: 'embassy',
      title: 'التقديم للسفارة',
      desc: 'تم تسليم الجواز للسفارة للمعالجة',
      date: result.embassy_submit_date,
      icon: '🏛️',
    },
    {
      key: 'exit',
      title: 'الخروج المتوقع',
      desc: 'الموعد المتوقع لانتهاء المعالجة',
      date: result.expected_exit_date,
      icon: '✨',
    },
  ];

  // Determine step status (completed, active, pending) based on dates and overall status
  const getStepStatus = (step, index) => {
    // If we have a date, it's at least active or completed
    if (step.date) {
      const stepDate = new Date(step.date);
      const today = new Date();
      
      // If date is in past, it's completed
      if (stepDate < today) return 'completed';
      // If date is today or future, it's active
      return 'active';
    }
    
    // Fallback logic using overall status if dates aren't fully populated
    if (result.status === 'ready') return 'completed';
    if (result.status === 'rejected') return index === 0 ? 'completed' : 'pending';
    
    if (result.status === 'in_embassy') {
        if (index <= 1) return 'completed';
        return 'active'; 
    }

    // Default for pending status
    if (index === 0) return 'active';
    return 'pending';
  };

  return (
    <div className="status-result">
      <div className="status-card found">
        {/* Premium Header */}
        <div className="status-header-premium">
          <div className="premium-info">
            <h2 className="status-title" style={{ color: statusConfig.color }}>
              {statusConfig.icon} {statusConfig.label}
            </h2>
            
            {fullName && (
              <p className="status-name">
                مرحباً، <strong>{fullName}</strong>
              </p>
            )}
            
            <div className="premium-badge">
              رقم الجواز: {result.passport_number}
            </div>

            {result.visa_type && (
               <div className="visa-type-container">
                 <span className="visa-type-label">نوع التأشيرة</span>
                 <span className="visa-type-value">{result.visa_type}</span>
               </div>
            )}
          </div>
        </div>

        {/* Timeline Schedule */}
        <div className="timeline-container">
          {timelineSteps.map((step, index) => {
            const stepStatus = getStepStatus(step, index);
            const formattedDate = formatDate(step.date);
            
            return (
              <div key={step.key} className={`timeline-step ${stepStatus}`}>
                <div className="timeline-marker">
                  {stepStatus === 'completed' ? '✓' : step.icon}
                </div>
                <div className="timeline-content">
                  {formattedDate ? (
                    <span className="timeline-date">{formattedDate}</span>
                  ) : (
                    <span className="timeline-date">--/--/----</span>
                  )}
                  <h4 className="timeline-title">{step.title}</h4>
                  <p className="timeline-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="status-body" style={{ marginTop: '2rem' }}>
            {statusConfig.message && (
                <p className="status-message">{statusConfig.message}</p>
            )}
          
            {result.admin_notes && (
                <div className="admin-notes">
                <strong>ملاحظة من الإدارة:</strong> {result.admin_notes}
                </div>
            )}
        </div>

        <button onClick={onReset} className="btn-reset">
          التحقق من جواز آخر
        </button>
      </div>
    </div>
  );
};

export default StatusResult;
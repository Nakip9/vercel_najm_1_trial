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
  const updatedDate = result.updated_at
    ? new Date(result.updated_at).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : null;

  return (
    <div className="status-result">
      <div
        className="status-card found"
        style={{
          borderColor: statusConfig.color,
          backgroundColor: statusConfig.bgColor,
        }}
      >
        <div className="status-header">
          <div
            className="status-icon-large"
            style={{ color: statusConfig.color }}
          >
            {statusConfig.icon}
          </div>
          <div className="status-info">
            {fullName && (
              <p className="status-name">
                مرحباً، <strong>{fullName}</strong>
              </p>
            )}
            <h3 className="status-title" style={{ color: statusConfig.color }}>
              {statusConfig.label}
            </h3>
            <p className="status-passport">
              رقم الجواز: <strong>{result.passport_number}</strong>
            </p>
            {updatedDate && (
              <p className="status-date">آخر تحديث: {updatedDate}</p>
            )}
          </div>
        </div>

        <div className="status-body">
          <p className="status-message">{statusConfig.message}</p>

          {result.admin_notes && (
            <div className="admin-notes">
              <strong>ملاحظة:</strong> {result.admin_notes}
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
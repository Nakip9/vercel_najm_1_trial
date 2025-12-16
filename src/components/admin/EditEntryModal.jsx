import { useState, useEffect } from 'react';
import './Admin.css';

const EditEntryModal = ({ entry, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: entry.first_name || '',
    last_name: entry.last_name || '',
    status: entry.status,
    admin_notes: entry.admin_notes || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    setLoading(true);

    try {
      const response = await fetch('/api/admin/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: entry.id,
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          status: formData.status,
          admin_notes: formData.admin_notes.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to update entry');
        return;
      }

      alert('Entry updated successfully!');
      onSuccess();
    } catch (err) {
      console.error('Error updating entry:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Entry</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="entry-info">
            <p>
              <strong>Passport Number:</strong> {entry.passport_number}
            </p>
            <p>
              <strong>Created:</strong> {new Date(entry.created_at).toLocaleString()}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="edit-first-name">First Name</label>
                <input
                  type="text"
                  id="edit-first-name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  placeholder="First name"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-last-name">Last Name</label>
                <input
                  type="text"
                  id="edit-last-name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  placeholder="Last name"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="edit-status">Status *</label>
              <select
                id="edit-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
                disabled={loading}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="ready">Ready</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="edit-notes">Admin Notes (Optional)</label>
              <textarea
                id="edit-notes"
                value={formData.admin_notes}
                onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                placeholder="Add any notes about this entry..."
                rows="4"
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update Entry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEntryModal;


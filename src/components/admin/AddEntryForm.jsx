import { useState } from 'react';
import './Admin.css';

const AddEntryForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    passport_number: '',
    status: 'pending',
    admin_notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.passport_number.trim()) {
      setError('Passport number is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/create-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passport_number: formData.passport_number.trim().toUpperCase(),
          status: formData.status,
          admin_notes: formData.admin_notes.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create entry');
        return;
      }

      // Reset form
      setFormData({
        passport_number: '',
        status: 'pending',
        admin_notes: '',
      });

      alert('Entry created successfully!');
      onSuccess();
    } catch (err) {
      console.error('Error creating entry:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-entry-form">
      <h3>Add New Passport Entry</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="passport-number">Passport Number *</label>
            <input
              type="text"
              id="passport-number"
              value={formData.passport_number}
              onChange={(e) =>
                setFormData({ ...formData, passport_number: e.target.value })
              }
              placeholder="Enter passport number"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
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
        </div>

        <div className="form-group">
          <label htmlFor="admin-notes">Admin Notes (Optional)</label>
          <textarea
            id="admin-notes"
            value={formData.admin_notes}
            onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
            placeholder="Add any notes about this entry..."
            rows="3"
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Entry'}
        </button>
      </form>
    </div>
  );
};

export default AddEntryForm;


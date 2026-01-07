import { useState, useEffect } from 'react';
import AddEntryForm from '../components/admin/AddEntryForm';
import PassportTable from '../components/admin/PassportTable';
import './Admin.css';

const Admin = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'Najm123123') {
      setIsAuthenticated(true);
      // Optional: Save to localStorage for persistence
      // localStorage.setItem('adminAuth', 'true');
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    // localStorage.removeItem('adminAuth');
  };

  const fetchEntries = async (page = 1, search = '', status = 'all') => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
      });

      if (search.trim()) {
        params.append('search', search.trim());
      }

      if (status !== 'all') {
        params.append('status', status);
      }

      const response = await fetch(`/api/admin/list-entries?${params.toString()}`);

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل في جلب البيانات');
        return;
      }

      setEntries(data.data || []);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error fetching entries:', err);
      setError('حدث خطأ أثناء جلب البيانات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries(currentPage, searchTerm, statusFilter);
    }
  }, [currentPage, searchTerm, statusFilter, isAuthenticated]);

  const handleRefresh = () => {
    fetchEntries(currentPage, searchTerm, statusFilter);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div className="login-card" style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#1a1a1a' }}>تسجيل دخول المسؤول</h2>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="كلمة المرور"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    fontSize: '1rem'
                  }}
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#004aad',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                دخول
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>لوحة الإدارة - إدارة حالة الفيزا</h1>
            <p>إدارة مدخلات جوازات السفر وحالات الفيزا</p>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            تسجيل خروج
          </button>
        </div>

        <div className="admin-content">
          <AddEntryForm onSuccess={handleRefresh} />

          <div className="admin-filters">
            <div className="filter-group">
              <label htmlFor="search">ابحث عن الجواز</label>
              <input
                type="text"
                id="search"
                placeholder="أدخل رقم الجواز..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="status-filter">فرز حسب الحاله</label>
              <select id="status-filter" value={statusFilter} onChange={handleStatusFilter}>
                <option value="all">الكل</option>
                <option value="pending">في الانتظار</option>
                <option value="in_embassy">في السفارة</option>
                <option value="ready">جاهز</option>
                <option value="in_aden">في عدن</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="error-banner">
              {error}
              <button onClick={handleRefresh}>إعادة المحاولة</button>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="spinner-large"></div>
              <p>جاري تحميل البيانات...</p>
            </div>
          ) : (
            <>
              <PassportTable
                entries={entries}
                onRefresh={handleRefresh}
                onDelete={handleRefresh}
              />

              {pagination && pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="btn-pagination"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    السابق
                  </button>
                  <span className="pagination-info">
                    صفحة {pagination.page} من {pagination.totalPages} (الكل {pagination.total})
                  </span>
                  <button
                    className="btn-pagination"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                  >
                    التالي
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
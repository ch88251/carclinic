import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments, deleteAppointment } from '../../api/appointmentapi';
import './AppointmentList.css';

const STATUS_LABELS = {
  SCHEDULED: 'Scheduled',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const PAGE_SIZE = 10;

function AppointmentList() {
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });

  const { mutate: cancelMutate } = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      setToast('Appointment cancelled.');
      setTimeout(() => setToast(null), 3000);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const rows = data ?? [];
  const filtered = statusFilter ? rows.filter((r) => r.status === statusFilter) : rows;
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const pageRows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(0);
  };

  return (
    <div className="appointment-list">
      <div className="appointment-list__toolbar">
        <select
          className="appt-filter-select"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <button className="btn btn--primary" onClick={() => navigate('/appointments/new')}>
          + Schedule Appointment
        </button>
      </div>

      {isLoading && <span className="appointment-list__status">Loading…</span>}
      {isError  && <span className="appointment-list__status appointment-list__status--error">Error loading appointments.</span>}

      {isSuccess && (
        <>
          <div className="appointment-table-wrapper">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Staff</th>
                  <th>Status</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr key={row.id}>
                    <td className="td-date">{row.appointmentDate}</td>
                    <td>{row.customerName}</td>
                    <td>{row.vehicleDescription}</td>
                    <td>{row.staffName ?? '—'}</td>
                    <td>
                      <span className={`status-badge status-badge--${(row.status ?? '').toLowerCase().replace('_', '-')}`}>
                        {STATUS_LABELS[row.status] ?? row.status}
                      </span>
                    </td>
                    <td className="col-actions">
                      <button
                        className="btn btn--cancel"
                        disabled={row.status !== 'SCHEDULED'}
                        onClick={() => {
                          if (window.confirm('Cancel this appointment?')) {
                            cancelMutate(row.id);
                          }
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="appointment-list__empty">No appointments found.</p>
            )}
          </div>

          {pageCount > 1 && (
            <div className="pagination">
              <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                &lsaquo; Prev
              </button>
              <span>Page {page + 1} of {pageCount}</span>
              <button disabled={page >= pageCount - 1} onClick={() => setPage((p) => p + 1)}>
                Next &rsaquo;
              </button>
            </div>
          )}
        </>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default AppointmentList;

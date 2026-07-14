import { useEffect, useState } from "react";
import api from "../api/axios.js";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await api.get("/admin/bookings");
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, bookingStatus) => {
    await api.put(`/admin/bookings/${id}/status`, { bookingStatus });
    fetchBookings();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;
    await api.delete(`/admin/bookings/${id}`);
    fetchBookings();
  };

  if (loading) return <div className="page-loading">Loading bookings...</div>;

  return (
    <div>
      <h1>Bookings</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ref</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Customer</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.bookingRef}</td>
              <td>{b.hotel?.name}</td>
              <td>{b.room?.roomType}</td>
              <td>{b.customer?.firstName} {b.customer?.lastName}<br /><small>{b.customer?.email}</small></td>
              <td>{new Date(b.checkIn).toLocaleDateString()}</td>
              <td>{new Date(b.checkOut).toLocaleDateString()}</td>
              <td>INR {b.grandTotal.toFixed(2)}</td>
              <td><span className={`status-pill status-${b.paymentStatus}`}>{b.paymentStatus}</span></td>
              <td>
                <select
                  value={b.bookingStatus}
                  onChange={(e) => handleStatusChange(b._id, e.target.value)}
                  className="input small"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button className="btn-link danger" onClick={() => handleDelete(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;

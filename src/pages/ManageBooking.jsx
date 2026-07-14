import { useState } from "react";
import api from "../api/axios.js";

const ManageBooking = () => {
  const [ref, setRef] = useState("");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setBooking(null);
    try {
      const { data } = await api.get(`/bookings/ref/${ref}`);
      setBooking(data);
    } catch (err) {
      setError("Booking not found. Please check your reference and try again.");
    }
  };

  return (
    <div className="manage-booking-page">
      <h1 >Manage My Booking</h1>
      <div className="search-row">
        <input
          className="input"
          placeholder="Enter Booking Reference (e.g. BKG-XXXXXX)"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error-text">{error}</div>}
      {booking && (
        <div className="confirm-details" style={{ marginTop: 20 }}>
          <div><span>Hotel</span><span>{booking.hotel.name}</span></div>
          <div><span>Room</span><span>{booking.room.roomType}</span></div>
          <div><span>Guest</span><span>{booking.customer.firstName} {booking.customer.lastName}</span></div>
          <div><span>Check In</span><span>{new Date(booking.checkIn).toLocaleDateString()}</span></div>
          <div><span>Check Out</span><span>{new Date(booking.checkOut).toLocaleDateString()}</span></div>
          <div><span>Booking Status</span><span>{booking.bookingStatus}</span></div>
          <div><span>Payment Status</span><span>{booking.paymentStatus}</span></div>
          <div><span>Grand Total</span><span>INR {booking.grandTotal.toFixed(2)}</span></div>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;

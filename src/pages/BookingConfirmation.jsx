import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";

const BookingConfirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await api.get(`/bookings/${id}`);
      setBooking(data);
    };
    fetchBooking();
  }, [id]);

  if (!booking) return <div className="page-loading">Loading...</div>;

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirm-icon">✅</div>
        <h1>Booking Confirmed!</h1>
        <p>Thank you, {booking.customer.firstName}. Your reservation at {booking.hotel.name} is confirmed.</p>
        <div className="confirm-ref">Booking Reference: <strong>{booking.bookingRef}</strong></div>

        <div className="confirm-details">
          <div><span>Room</span><span>{booking.room.roomType}</span></div>
          <div><span>Check In</span><span>{new Date(booking.checkIn).toLocaleDateString()}</span></div>
          <div><span>Check Out</span><span>{new Date(booking.checkOut).toLocaleDateString()}</span></div>
          <div><span>Nights</span><span>{booking.nights}</span></div>
          <div><span>Payment Status</span><span className="paid-badge">{booking.paymentStatus}</span></div>
          <div><span>Grand Total</span><span>INR {booking.grandTotal.toFixed(2)}</span></div>
        </div>

        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;

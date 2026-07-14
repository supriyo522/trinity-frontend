import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import GuestInfoForm from "../components/GuestInfoForm.jsx";
import PromoCode from "../components/PromoCode.jsx";
import ReservationSummary from "../components/ReservationSummary.jsx";
import { FaBolt, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const todayPlus = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const BookingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState(todayPlus(7));
  const [checkOut, setCheckOut] = useState(todayPlus(8));
  const [promoCode, setPromoCode] = useState(null);
  const [quote, setQuote] = useState({ nights: 1, totalCharges: 0, discount: 0, totalTaxes: 0, grandTotal: 0 });
  const [activeTab, setActiveTab] = useState("info");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    const fetchHotel = async () => {
      const { data } = await api.get(`/hotels/${slug}`);
      setHotel(data.hotel);
      setRooms(data.rooms);
      if (data.rooms.length) setSelectedRoom(data.rooms[0]._id);
    };
    fetchHotel();
  }, [slug]);

  useEffect(() => {
    const fetchQuote = async () => {
      if (!selectedRoom || !checkIn || !checkOut) return;
      try {
        const { data } = await api.post("/bookings/quote", {
          roomId: selectedRoom,
          checkIn,
          checkOut,
          promoCode,
        });
        setQuote(data);
      } catch (err) {
        
      }
    };
    fetchQuote();
  }, [selectedRoom, checkIn, checkOut, promoCode]);

  const handleCheckAvailability = () => {

    document.getElementById("bookingsteps")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePayment = async () => {
    setError("");
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Please fill in all required guest information.");
      return;
    }
    if (!acceptPolicy) {
      setError("Please accept the Reservation & Cancellation Policy.");
      return;
    }
    setLoading(true);
    try {
      const { data: booking } = await api.post("/bookings", {
        hotelId: hotel._id,
        roomId: selectedRoom,
        checkIn,
        checkOut,
        guests: 1,
        promoCode,
        ...formData,
      });


      await api.post("/payment/mock-charge", {
        bookingId: booking._id,
        cardNumberLast4: "1234",
      });

      navigate(`/booking/${booking._id}/confirmation`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) return <div className="page-loading">Loading hotel details...</div>;

  return (
    <div className="booking-page">
      <header className="hotel-header">
        <div>
          <h1>{hotel.name}</h1>
          <p>{hotel.tagline} {hotel.address}</p>
        </div>
        <nav className="header-nav">
          <a href="#property-info">Property Info</a>
          <a href="#photo-gallery">Photo Gallery</a>
          <a href="#facilities">Facilities</a>
          <a href="#location">Location</a>
        </nav>
      </header>

      <div className="dates-bar">
        <input type="date" className="input" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        <input type="date" className="input" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        <div className="nights-display">{quote.nights} night{quote.nights > 1 ? "s" : ""}</div>
        <button className="btn btn-warning" onClick={handleCheckAvailability}>Check Availability</button>
        <div className="dates-bar-right">
          <button className="btn btn-outline" onClick={() => navigate("/manage-booking")}>Manage My Booking</button>
        </div>
      </div>

      <div className="room-select">
        <label>Room Type: </label>
        <select className="input" value={selectedRoom || ""} onChange={(e) => setSelectedRoom(e.target.value)}>
          {rooms.map((r) => (
            <option key={r._id} value={r._id}>
              {r.roomType} — INR {r.basePricePerNight}/night
            </option>
          ))}
        </select>
      </div>

      <div id="bookingsteps" className="booking-grid">
        <div className="booking-main">
          <GuestInfoForm formData={formData} onChange={setFormData} />

          <div className="panel">
            <div className="panel-header">Make Payment</div>
            <div className="panel-body">
              <label className="payment-option">
                <input type="radio" checked readOnly />
                <span>MockPay Gateway (Test Mode)</span>
              </label>
              <p className="hint">
                This is a simulated payment gateway for demo purposes. No real card details are needed —
                clicking "Make Payment" will instantly simulate a successful transaction.
              </p>
              <label className="policy-check">
                <input
                  type="checkbox"
                  checked={acceptPolicy}
                  onChange={(e) => setAcceptPolicy(e.target.checked)}
                />
                I have read and accept the Reservation &amp; Cancellation Policy.
              </label>
              {error && <div className="error-text">{error}</div>}
              <button className="btn btn-success" onClick={handlePayment} disabled={loading}>
                {loading ? "Processing..." : "MAKE PAYMENT"}
              </button>
            </div>
          </div>

          <div id="facilities" className="panel">
            <div className="panel-header">Facilities</div>
            <div className="panel-body facilities-grid">
              {hotel.facilities.map((f) => (
                <div key={f} className="facility-item">{f}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-sidebar">
          <PromoCode onApply={(code) => setPromoCode(code)} />
          <ReservationSummary
            checkIn={checkIn}
            checkOut={checkOut}
            nights={quote.nights}
            totalCharges={quote.totalCharges}
            discount={quote.discount}
            totalTaxes={quote.totalTaxes}
            grandTotal={quote.grandTotal}
          />
       <div className="trust-badges">
  <div className="trust-item">
    <FaBolt className="trust-icon bolt-icon" />
    Instant Reservation Confirmation
  </div>

  <div className="trust-item">
    <FaShieldAlt className="trust-icon shield-icon" />
    Book Direct &amp; Save More
  </div>

  <div className="trust-item">
    <FaCheckCircle className="trust-icon check-icon" />
    Lowest Rates
  </div>
</div>
        </div>
      </div>

      <footer className="site-footer">© 2026 All rights reserved. Hotel Booking Engine</footer>
    </div>
  );
};

export default BookingPage;

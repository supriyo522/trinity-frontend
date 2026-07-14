const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const ReservationSummary = ({ checkIn, checkOut, nights, totalCharges, totalTaxes, discount, grandTotal }) => {
  return (
    <div className="panel">
      <div className="panel-header">Reservation Summary</div>
      <div className="panel-body">
        <div className="summary-dates">
          <div>
            <div className="label">Check In</div>
            <div className="value">{checkIn ? formatDate(checkIn) : "-"}</div>
          </div>
          <span className="badge">{nights} night{nights > 1 ? "s" : ""}</span>
          <div style={{ textAlign: "right" }}>
            <div className="label">Check Out</div>
            <div className="value">{checkOut ? formatDate(checkOut) : "-"}</div>
          </div>
        </div>

        <div className="summary-line">
          <span>Total Charges</span>
          <span>INR {totalCharges.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="summary-line discount">
            <span>Discount</span>
            <span>- INR {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="summary-line">
          <span>Total Taxes</span>
          <span>INR {totalTaxes.toFixed(2)}</span>
        </div>
        <div className="summary-line grand-total">
          <span>Grand Total</span>
          <span>INR {grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;

import { useState } from "react";

const PromoCode = ({ onApply }) => {
  const [code, setCode] = useState("");

  return (
    <div className="panel">
      <div className="panel-header">Promo Code</div>
      <div className="panel-body promo-row">
        <input
          className="input"
          placeholder="Promo Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => onApply(code)}>
          Apply →
        </button>
      </div>
    </div>
  );
};

export default PromoCode;

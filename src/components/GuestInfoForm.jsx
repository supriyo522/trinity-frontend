const GuestInfoForm = ({ formData, onChange }) => {
  const handle = (e) => onChange({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="panel">
      <div className="panel-header">Guest Information</div>
      <div className="panel-body grid-2">
        <input
          className="input"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handle}
          required
        />
        <input
          className="input"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handle}
          required
        />
        <input
          className="input"
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handle}
          required
        />
        <input
          className="input"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handle}
          required
        />
        <input
          className="input"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handle}
        />
        <input
          className="input"
          name="country"
          placeholder="Country of Residence"
          value={formData.country}
          onChange={handle}
        />
      </div>
    </div>
  );
};

export default GuestInfoForm;

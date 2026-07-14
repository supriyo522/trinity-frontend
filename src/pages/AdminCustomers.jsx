import { useEffect, useState } from "react";
import api from "../api/axios.js";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data } = await api.get("/admin/customers");
    setCustomers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;
    await api.delete(`/admin/customers/${id}`);
    fetchCustomers();
  };

  if (loading) return <div className="page-loading">Loading customers...</div>;

  return (
    <div>
      <h1>Customers</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td>{c.firstName} {c.lastName}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.city}</td>
              <td>{c.country}</td>
              <td>
                <button className="btn-link danger" onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCustomers;

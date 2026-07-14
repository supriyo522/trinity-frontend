import { Routes, Route, Navigate } from "react-router-dom";
import BookingPage from "./pages/BookingPage.jsx";
import BookingConfirmation from "./pages/BookingConfirmation.jsx";
import ManageBooking from "./pages/ManageBooking.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminBookings from "./pages/AdminBookings.jsx";
import AdminCustomers from "./pages/AdminCustomers.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
     
      <Route path="/" element={<Navigate to="/hotels/trinity-suites-bangalore" replace />} />
      <Route path="/hotels/:slug" element={<BookingPage />} />
      <Route path="/booking/:id/confirmation" element={<BookingConfirmation />} />
      <Route path="/manage-booking" element={<ManageBooking />} />


      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="customers" element={<AdminCustomers />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

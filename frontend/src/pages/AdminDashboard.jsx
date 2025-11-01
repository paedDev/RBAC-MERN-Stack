// pages/AdminDashboard.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  // Redirect non-admins
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-6">
        <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-white/80">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-2xl">1,234</p>
        </div>
        {/* More admin stats */}
      </div>
    </div>
  );
};

export default AdminDashboard;

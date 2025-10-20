
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Dashboard;
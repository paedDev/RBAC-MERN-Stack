
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full h-screen  ">
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Dashboard;

import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <section className="w-full h-full  ">
      <header className='w-full bg-red-200 p-6'>
        <h1>Welcome, {user?.name || 'User'}!</h1>
        <button onClick={logout}>Logout</button>
      </header>
    </section>
  );
};
export default Dashboard;
import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Navbar, { SideBarItem } from "./components/Navbar.jsx";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,

} from 'lucide-react';
import Products from './pages/Products.jsx';

const App = () => {
  const location = useLocation();
  const hideNavbar = ['/login', '/register'].includes(location.pathname);
  return (
    <div className='flex w-full min-h-screen'>
      {!hideNavbar && (
        <Navbar>
          <SideBarItem icon={<LayoutDashboard />} text={"Dashboard"} active to={'/dashboard'} />
          <SideBarItem icon={<Package />} text={"Products"} to={"/products"} />
          <SideBarItem icon={<ShoppingCart />} text={"Orders"} />
          <SideBarItem icon={<Users />} text={"Customers"} />
          <SideBarItem icon={<BarChart3 />} text={"Analytics"} />
          <SideBarItem icon={<Settings />} text={"Settings"} />
        </Navbar>
      )}
      <main className='p-6  w-full overflow-auto'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/admin/dashboard' element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          {/* Product Routes */}
          <Route path='/products' element={<Products />} />
        </Routes>
      </main>

    </div >


  );
};

export default App;
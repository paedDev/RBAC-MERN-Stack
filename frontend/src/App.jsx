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
import NotFound from './pages/NotFound.jsx';
import { useAuth } from './context/AuthContext.jsx';
import CreateProducts from './pages/Auth/CreateProducts.jsx';

const App = () => {
  const { user } = useAuth();
  const location = useLocation();
  const showNavbar = ['/dashboard', '/admin/dashboard', '/products', '/orders', '/customers', '/analytics', '/settings', '/create-products'].includes(location.pathname);

  const isAdmin = user?.role === 'admin';

  return (
    <div className='flex w-full min-h-screen'>
      {showNavbar && (
        <Navbar>
          {
            isAdmin ? (
              <>
                <SideBarItem icon={<LayoutDashboard />} text={"Dashboard"} to={'/dashboard'} />
                <SideBarItem icon={<Package />} text={"Create Product"} to={"/create-products"} />

                <SideBarItem icon={<ShoppingCart />} text={"Orders"} to={"/orders"} />
                <SideBarItem icon={<Users />} text={"Customers"} to={"/customers"} />
                <SideBarItem icon={<BarChart3 />} text={"Analytics"} to={"/analytics"} />

              </>
            ) : (
              <>
                <SideBarItem icon={<LayoutDashboard />} text="User Dashboard" to="/dashboard" />
                <SideBarItem icon={<Package />} text={"Products"} to={"/products"} />
                <SideBarItem icon={<ShoppingCart />} text="Orders" to="/orders" />
              </>

            )

          }
          <SideBarItem icon={<Settings />} text="Settings" to="/settings" />
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
          <Route path='/products' element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />
          <Route path='/create-products' element={
            <ProtectedRoute>
              <CreateProducts />
            </ProtectedRoute>
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

    </div >


  );
};

export default App;
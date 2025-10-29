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
import UpdateProduct from './pages/Auth/UpdateProduct.jsx';
import ViewProduct from './pages/ViewProduct.jsx';

const App = () => {
  const { user } = useAuth();
  const location = useLocation();
  const showNavbar =
    location.pathname === '/dashboard' ||
    location.pathname === '/admin/dashboard' ||
    location.pathname === '/products' ||
    location.pathname === '/orders' ||
    location.pathname === '/customers' ||
    location.pathname === '/analytics' ||
    location.pathname === '/settings' ||
    location.pathname === '/create-products' ||
    location.pathname.startsWith('/update-products/') ||
    location.pathname.startsWith('/product/');


  const isAdmin = user?.role === 'admin';

  return (
    <div className='flex w-full min-h-screen'>
      {showNavbar && (
        <Navbar>
          {
            isAdmin ? (
              <>
                <SideBarItem icon={<LayoutDashboard />} text={"Admin Dashboard"} to={'/admin/dashboard'} />
                <SideBarItem icon={<Package />} text={"Products"} to={"/products"} />

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
          <Route path='/update-product/:id' element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          } />
          <Route path='/product/:id' element={<ViewProduct />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

    </div >


  );
};

export default App;
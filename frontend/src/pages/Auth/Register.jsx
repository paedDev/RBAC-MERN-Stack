import React, { useContext, useState } from 'react';
import { Eye, EyeOff, ChevronDown, Mail, LockKeyhole, UserRound, Lock } from 'lucide-react';
import axios from "axios";
import { BASE_URL } from '../../config/config';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../../components/Button.jsx';
import InputField from '../../components/InputField.jsx';
import PasswordField from '../../components/PasswordField.jsx';

const Register = () => {
  const { loading, setLoading, showPassword, setShowPassword, handleSetShowPasword } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: 'customer'
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, email, password, role } = formData;
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        role,
      });

      toast.success("Successfully created an account");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      console.log(response.data);

    } catch (error) {
      console.error(`Error registering`);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      else {
        toast.error("Failed to create an account");
        console.log(`Registration Error`, error);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">


      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border p-10 rounded-xl border-gray-200 shadow-xl space-y-8 h-full">

        <h2 className="mb-20 text-center text-2xl font-bold tracking-tight text-black">Register an Account</h2>
        <form action="#" onSubmit={handleSubmit} className="space-y-8">
          <div className='flex items-center justify-between gap-3'>
            <InputField
              id="name"
              label="Name"
              icon={<UserRound size={15} />}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleValueChange}
            />
            <InputField
              id="email"
              label="Email"
              icon={<Mail size={15} />}
              placeholder="Enter your email"
              value={formData.email}
              type="email"
              onChange={handleValueChange}
            />
          </div>
          <PasswordField
            id="password"
            label="Password"
            icon={<Lock size={15} />}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleValueChange}
            showPassword={showPassword}
            handleSetShowPasword={handleSetShowPasword}
          />

          <div>
            <label htmlFor="role" className="block text-sm/6 font-medium text-gray-800">
              Role
            </label>
            <div className="mt-2 relative">
              <select
                value={formData.role}
                onChange={handleValueChange}
                id="role"
                name="role"
                required
                className="block w-full rounded-lg bg-white px-3 py-1 pr-10  text-gray-900 border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all appearance-none cursor-pointer hover:border-indigo-400 text-md"
              >
                <option value="" disabled>Select a role</option>
                <option value="customer"  >👤 Customer - View & Purchase</option>
                <option value="admin">🛡️ Admin - Full Access</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          <Button >
            {loading ? "Loading" : "Register"}
          </Button>


        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already a member?{' '}
          <Link to={'/login'} className="font-semibold text-indigo-400 hover:text-indigo-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};


export default Register;
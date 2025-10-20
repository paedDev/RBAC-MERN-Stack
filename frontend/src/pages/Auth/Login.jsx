import { Eye, EyeOff, UserRound, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config/config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../../components/Button.jsx';
import InputField from '../../components/InputField.jsx';
import PasswordField from '../../components/PasswordField.jsx';
const Login = () => {
  const { loading, setLoading, showPassword, handleSetShowPasword, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      const { email, password } = formData;
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password
      });
      const token = response.data.token;
      const userData = response.data.user;
      login(token, userData);
      toast.success("Logged in successfully");

    } catch (error) {
      console.error(`Error Login`);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      else {
        toast.error("Failed to login");
        console.log(`Error in Login`, error);

      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md  border p-10 rounded-xl border-gray-200 shadow-xl space-y-8">
        <h2 className="mb-20 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
        <form action="#" onSubmit={handleSubmit} className="space-y-8">

          <div className="relative group-label">
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

          <Button>
            {loading ? "Loading" : "Login"}
          </Button>

        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?{' '}
          <Link to={'/register'} className="font-semibold text-indigo-400 hover:text-indigo-300">
            Register an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
import  Card  from "@mui/material/Card";
import  Container  from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import { useAuth } from "../context/authContext";
import { Message, Password } from "@mui/icons-material";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../components/Alert";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { colors } from "@mui/material";
export default function Login(){
    const {login,admin}=useAuth();
     const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [alert,setAlert]=useState({message:null,color:""});
    const navigate=useNavigate();
  
useEffect(() => {
  if (admin?.role === "ADMIN") {
    navigate("/dashboard");
  } else if (admin?.role === "DELEVERY") {
    navigate("/Delivery-Dashboard");
  }
}, [admin, navigate]);

    const handleSubmit = async (e) => {
  e.preventDefault();
console.log("admin after login:", admin);
  try {
    await login(email, password);
    setAlert({message:"welcom to your dashboard",color:"success"});
  } catch (err) {
    setAlert({message:"login failed email or password are incorrect",color:"error"});
  }
};
    


 return (
    <div className="min-h-screen flex " >
      {alert.message && (
      
  <AlertMessage
    message={alert.message}
    color={alert.color}
    
    onClose={() => setAlert({ message: "", color: "" })}
  />
)}
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-2xl">🍔</span>
              </div>
              <span className="text-3xl font-bold text-gray-900">Taki Food</span>
            </div>
            <p className="text-gray-600 mt-2">Dashboard Login</p>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">
              Please enter your credentials to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MailOutlinedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockOutlinedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon className="h-5 w-5" />
                  ) : (
                    <VisibilityOutlinedIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

          
            <div className="flex items-center justify-between">
              <div className="flex items-center">
             
              
              </div>
            
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group"
             >
              Sign In
              <ArrowForwardOutlinedIcon  className="h-5 w-5 group-hover:translate-x-1 transition-transform" style={{transition:"0.3s"}}/>
            </button>

         

         
          </form>

       
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:block lg:flex-1 relative bg-gradient-to-br from-red-600 to-orange-500">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY1NzEwMTc1fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="max-w-lg text-white">
            <h2 className="text-4xl font-bold mb-6">
              Manage Your Restaurant Dashboard
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Access your analytics, manage orders, update your menu, and track your business performance all in one place.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Real-time Analytics</h3>
                  <p className="text-white/80 text-sm">
                    Track sales, orders, and customer insights in real-time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Category Management</h3>
                  <p className="text-white/80 text-sm">
                    Efficiently manage and process food categories
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Menu Customization</h3>
                  <p className="text-white/80 text-sm">
                    Update your menu items, prices, and availability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  );
}
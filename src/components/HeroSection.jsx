
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useTheme } from '../context/ThemeContext';
import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css/";
export function HeroSection() {
  const { theme } = useTheme();

  const bgClass =
    theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200";
  const headingClass =
    theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass =
    theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <section className="relative overflow-hidden">
      
      {/* Hero Banner */}
      <div className="relative h-[600px] bg-gradient-to-r from-red-500 to-orange-500 overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('LandingImg.jpg')`,
            animation: "zoomFade 1.5s ease forwards",
          }}
        />

        {/* Overlay Glow */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">

            {/* Heading */}
            <h1
              className="text-6xl font-extrabold text-white mb-6 leading-tight"
              style={{ animation: "fadeSlideRight 0.8s ease forwards" }}
            >
              Delicious Food <br />
              Delivered Fast
            </h1>

            {/* Paragraph */}
            <p
              className="text-xl text-white/90 mb-8"
              style={{
                animation: "fadeSlideUp 1s ease forwards",
                animationDelay: "0.2s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              Order your favorite meals from our menu and get it delivered hot and fresh to your doorstep in under 30 minutes!
            </p>

            {/* Button */}
            <div
              className="flex gap-4"
              style={{
                animation: "fadeSlideUp 1.2s ease forwards",
                animationDelay: "0.4s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <Link to={"/Menu"}>
                <button className="relative overflow-hidden border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/10">
                  
                  {/* Glow effect */}
                  <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition duration-500"
                    style={{ animation: "glowButton 2s infinite" }}
                  />

                  View Menu
                </button>
              </Link>
              <Link to={"/Contact"}>
                <button className="relative overflow-hidden border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/10">
                  
                  {/* Glow effect */}
                  <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition duration-500"
                    style={{ animation: "glowButton 2s infinite" }}
                  />
Make a Reservation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className={`${bgClass} border-b transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[ 
              {
                icon: <LocalShippingOutlinedIcon />,
                title: "Fast Delivery",
                desc: "Under 30 minutes",
              },
              {
                icon: <AccessTimeOutlinedIcon />,
                title: "24/7 Service",
                desc: "Order anytime",
              },
              {
                icon: <StarRateOutlinedIcon />,
                title: "Quality Food",
                desc: "Fresh ingredients",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 group"
                style={{
                  animation: "fadeSlideUp 0.8s ease forwards",
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                <div className="bg-orange-100 p-3 rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ animation: "floatSlow 3s ease-in-out infinite" }}
                >
                  {React.cloneElement(item.icon, {
                    className: "w-6 h-6 text-red-600",
                  })}
                </div>

                <div>
                  <h3 className={`font-semibold ${headingClass}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${textClass}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

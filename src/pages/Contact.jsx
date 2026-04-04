import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import { useState, } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid as MuiGrid, Alert } from "@mui/material";
export default function Contact() {
  const { theme } = useTheme();
 
  // Dynamic UI classes
  const pageBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-gray-50";
  const headingText = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const paragraphText = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const formBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const inputBg = theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-800";
  const inputPlaceholder = theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";
  const [reservation,setReservation]=useState({name:'',partySize:"",phoneNumber:"",email:"",date:"",time:"",specialRequest:""})
  const [successOpen,setSuccessOpen]=useState(false);
  async function handleAddSubmit(reserv){
  try{
    const res = await axios.post(
      "https://flavia-backend.onrender.com/api/reservations",
      reserv,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

   setSuccessOpen(true);

   

  } catch(err){
    console.error("employee post err", err);
  }
}


  return (
    <div className={`min-h-screen ${pageBg}`}>
      
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-br from-red-400 to-orange-400 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Restaurant"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-4 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200">
              We'd love to hear from you. Visit us or make a reservation today.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          
          {/* Card 1 */}
          <div className={`${cardBg} rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300`}>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-6">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${headingText}`}>Location</h3>
            <p className={`text-lg mb-4 ${paragraphText}`}>
              123 Culinary Avenue<br />
              Downtown District<br />
              City, State 12345
            </p>
            <a href="#" className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
              Get Directions →
            </a>
          </div>

          {/* Card 2 */}
          <div className={`${cardBg} rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300`}>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-6">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${headingText}`}>Hours</h3>
            <div className={`text-lg space-y-2 mb-4 ${paragraphText}`}>
              <p><span className="font-semibold">Monday - Thursday:</span><br /> 11am - 10pm</p>
              <p><span className="font-semibold">Friday - Saturday:</span><br /> 11am - 11pm</p>
              <p><span className="font-semibold">Sunday:</span><br /> 10am - 9pm</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`${cardBg} rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300`}>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-6">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${headingText}`}>Contact</h3>
            <div className="space-y-3 mb-4">
              <div>
                <p className={`text-lg font-semibold ${paragraphText}`}>Phone</p>
                <p className={`${paragraphText} hover:text-amber-600 transition-colors`}>
                  <a href="tel:+213669210305">+213 669210305</a>
                </p>
              </div>
              <div>
                <p className={`text-lg font-semibold ${paragraphText}`}>Email</p>
                <p className={`${paragraphText} hover:text-amber-600 transition-colors`}>
                  <a href="mailto:t_boulemnakher@estin.dz">t_boulemnakher@estin.dz</a>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Reservation Form */}
        <div className={`rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${theme === "dark" ? "from-gray-800 to-gray-900" : "from-gray-200 to-gray-300"}`}>
          <div className="grid md:grid-cols-2">
            
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <h2 className={`text-4xl font-bold mb-8 ${headingText}`}>
                Make a Reservation
              </h2>

              <form className="space-y-6" onSubmit={(e)=>{
                e.preventDefault();
                handleAddSubmit(reservation);
              }}>

                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${paragraphText}`}>
                      Name
                    </label>
                    <input
                       onChange={(e)=>{
                      setReservation({...reservation,name:e.target.value})
                    }}
                    value={reservation.name}
                      type="text"
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors ${inputBg} ${inputPlaceholder}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${paragraphText}`}>
                      Email
                    </label>
                    <input
                    onChange={(e)=>{
                      setReservation({...reservation,email:e.target.value})
                    }}
                    value={reservation.email}
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors ${inputBg} ${inputPlaceholder}`}
                    />
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${paragraphText}`}>
                      Date
                    </label>
                    <input
                       onChange={(e)=>{
                      setReservation({...reservation,date:e.target.value})
                    }}
                    value={reservation.date}
                      type="date"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${inputBg}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${paragraphText}`}>
                      Time
                    </label>
                    <input
                       onChange={(e)=>{
                      setReservation({...reservation,time:e.target.value})
                    }}
                    value={reservation.time}
                      type="time"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${inputBg}`}
                    />
                  </div>
                </div>

                {/* Party Size + Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${paragraphText}`}>
                      Party Size
                    </label>
                    <select className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${inputBg}`}
                        onChange={(e)=>{
                      setReservation({...reservation,partySize:e.target.value})
                    }}
                    value={reservation.partySize}>
                      <option>Select guests</option>
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5 Guests</option>
                      <option>6 Guests</option>
                      <option>7+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${paragraphText}`}>
                      Phone
                    </label>
                    <input
                        onChange={(e)=>{
                      setReservation({...reservation,phoneNumber:e.target.value})
                    }}
                    value={reservation.phoneNumber}
                      type="tel"
                      placeholder="(555) 123-4567"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors ${inputBg} ${inputPlaceholder}`}
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${paragraphText}`}>
                    Special Requests
                  </label>
                  <textarea
                      onChange={(e)=>{
                      setReservation({...reservation,specialRequest:e.target.value})
                    }}
                    value={reservation.specialRequest}
                    rows={4}
                    placeholder="Let us know about any dietary preferences or special occasions..."
                    className={`w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors ${inputBg} ${inputPlaceholder}`}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
                >
                  Reserve Your Table
                </button>

              </form>
            </div>

            <div className="h-full min-h-[600px] bg-gradient-to-r from-red-300 to-orange-300 hidden md:block">
              <img
                src={"/ResturantDining.jpg"}
                alt="Restaurant dining"
                className="w-full h-full object-cover bg-center opacity-30"
              />
            </div>
          </div>
        </div>

      </div>
           <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}  PaperProps={{
          sx: {
            borderRadius: 4,
            animation: "scaleIn 0.3s ease",
          },
        }}>
        <DialogTitle>✅ Reservation Confirmed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your reservation has been placed successfully 🎉 <br />
            We will contact you soon!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

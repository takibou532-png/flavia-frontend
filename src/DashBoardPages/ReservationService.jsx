
import { useEffect,useState } from "react";

import  Container  from "@mui/material/Container";

import axios from "axios";

import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { CachedOutlined } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";
import ReservationCard from "../components/ReservationCard";


import OrderCard from "../components/OrderCard";

export default function ReservationService(){
   
      const [reservations,setReservations]=useState([]);
  
       const [filteredReservations, setFilteredReservations] = useState([]);
       const [searchTerm, setSearchTerm] = useState('');
       const [isLoading, setIsLoading] = useState(true);
  const {theme}=useTheme();
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const cardBgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingClass = theme === "dark" ? "text-white" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";


//  search for orders by phone number or fullName:
        useEffect(() => {
    const filtered = reservations.filter(
      (reserv) =>
    reserv.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reserv.name.toLowerCase().includes(searchTerm.toLowerCase()) 

    );
    setFilteredReservations(filtered);
  }, [searchTerm, reservations]);
         

  

// get All Orders
    useEffect(()=>{
        const loadReservations= async ()=>  {
        try{
        const res = await axios.get("https://flavia-backend.onrender.com/api/admin/reservations",
           {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
        );
         setReservations(res.data);
            console.log(res.data);
        }catch (err) {
        console.error("Reservations  failed to load => "+err)
        }finally {
      setIsLoading(false);
    }
    }
    loadReservations();
        
    },[])

   
    



   



     
    



    return(
      <>
      <Container 
              className={`min-h-screen ${bgClass} transition-colors`} sx={{ marginLeft: "140px" }}>
      <div
        className="relative h-80 bg-gradient-to-r from-red-500 to-orange-500 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        </div>
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        <div className={`${cardBgClass} rounded-2xl shadow-xl p-6 mb-8`}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <SearchOutlinedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders by phone number or costumer fullname "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={()=>{
               loadReservations();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <CachedOutlined className="w-5 h-5" />
              Refresh
            </button>
          </div>
          <div className={`mt-4 text-sm ${textClass}`}>
            Showing {filteredReservations.length} of {reservations.length} orders
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500" />
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className={`${cardBgClass} rounded-2xl shadow-xl p-12 text-center`}>
            <RestaurantOutlinedIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3  className={`text-xl font-semibold mb-2 ${headingClass}`}>
              {searchTerm ? 'No Reservations found' : 'No Reservations yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by creating your first menu item'}
            </p>
        
          </div>
        ) : (
          <div >
            {filteredReservations.map((reserv) => (
              <ReservationCard
                key={reserv.id}
                reservation={reserv}
              

              />
            ))}
          </div>
        )}
      </div>

       
      

    
     </Container>
        </>
    )
}
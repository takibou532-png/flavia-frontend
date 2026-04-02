
import { use, useEffect,useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import  Container  from "@mui/material/Container";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ItemCard from "../components/ItemCard";
import { CachedOutlined } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";


import OrderCard from "../components/OrderCard";

export default function OrderService(){
   
      const [orders,setOrders]=useState([]);
      
       const [filteredOrders, setFilteredOrders] = useState([]);
       const [searchTerm, setSearchTerm] = useState('');
       const [type,setType]=useState("daily");
       const [profitData, setProfitData] = useState(0);
       const [isLoading, setIsLoading] = useState(true);
  const {theme}=useTheme();
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const cardBgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingClass = theme === "dark" ? "text-white" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
console.log("orders "+orders);
const cartList=[
  {id:0,label:"daily"},
  {id:1,label:"monthly"},
  {id:2,label:"weekly"},
  {id:3,label:"all"}
]

//  search for orders by phone number or fullName:
        useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        ( (order.phoneNumber || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
  (order.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ) &&
    order.orderStatus ==="PENDING"

    );
    setFilteredOrders(filtered);
  
  }, [searchTerm, orders]);
         
useEffect(() => {
  console.log(filteredOrders);
}, [filteredOrders]);
  

// get All Orders
     const loadOrders= async ()=>  {
        try{
        const res = await axios.get("https://flavia-backend.onrender.com/api/admin/orders",
           {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
        );
         setOrders(res.data);
            console.log(res.data);
        }catch (err) {
        console.error("order failed to load "+err)
        }finally {
      setIsLoading(false);
    }
    }
    useEffect(()=>{
   
    loadOrders();
        
    },[])
    useEffect(() => {
  const loadProfit = async () => {
    try {
      const res = await axios.get(
        `https://flavia-backend.onrender.com/api/admin/orders/profit/${type}`,
        {
          withCredentials:true,
          headers:{"Content-Type": "application/json" }
        }
      );
      setProfitData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  loadProfit();
}, [type]);
    // handle DELIVERED Submite
 async function handleDeliveredSubmit(orderId) {
  try {
    await axios.patch(
      `https://flavia-backend.onrender.com/api/admin/orders/delivered/${orderId}`,
      null,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    // Update ONLY the edited order
 setOrders(prev =>
  prev.map(order =>
    order.id === orderId
      ? { ...order, orderStatus: "DELIVERED" }
      : order
  )
);

  } catch (err) {
    console.error("Order Delivered error:", err);
  }
}
    // handle CANCEL Submite
 async function handleCanceldSubmit(orderId) {
  try {
    await axios.patch(
      `https://flavia-backend.onrender.com/api/admin/orders/cancel/${orderId}`,
     null,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    // Update ONLY the edited order
   setOrders(prev =>
  prev.map(order =>
    order.id === orderId
      ? { ...order, orderStatus: "CANCELED" }
      : order
  )
);

  } catch (err) {
    console.error("Order CANCELED error:", err);
  }
}
   
    



   
const stats = {
  delivered: orders.filter(o => o.orderStatus === "DELIVERED").length,
  pending: orders.filter(o => o.orderStatus === "PENDING").length,
  canceled: orders.filter(o => o.orderStatus === "CANCELED").length,
};

const chartData = [
  { name: "Delivered", value: stats.delivered },
  { name: "Pending", value: stats.pending },
  { name: "Canceled", value: stats.canceled },
];

const profitChartData = [
  { name: "Profit", value: Number(profitData) },
  { name: "Remaining", value: 100 - Number(profitData) > 0 ? 100 - Number(profitData) : 0 }
];

const profitBarData = [
  {
    name: type.toUpperCase(),
    profit: Number(profitData),
  },
];

     
    



    return(
      <>
      <Container 
              className={`min-h-screen ${bgClass} transition-colors`} sx={{ marginLeft: "140px" }}>
    <div className={`${cardBgClass} rounded-2xl p-6 mb-8 flex justify-around items-center`}>
  <PieChart  width={400} height={300}>
    <Pie
      data={chartData}
      cx="50%"
      cy="50%"
      outerRadius={100}
      dataKey="value"
      label
    >
      {chartData.map((entry, index) => (
        <Cell key={index} fill={["#4CAF50", "#FFC107", "#F44336"][index]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
  <PieChart width={400} height={300}>
  <Pie
    data={profitChartData}
    cx="50%"
    cy="50%"
    outerRadius={100}
    dataKey="value"
    label
  >
    {profitChartData.map((entry, index) => (
      <Cell
        key={index}
        fill={["#2196F3", "#E0E0E0"][index]}
      />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
<div className="text-center mb-2">
  <h2 className="text-xl font-bold">
    {type.toUpperCase()} Profit
  </h2>
  <p className="text-2xl text-green-500 font-bold">
    {profitData} DA
  </p>
</div>



</div>
<div className={`${cardBgClass} rounded-2xl p-6 mb-8 flex justify-around items-center`}>
<div className="flex gap-2 mb-4 justify-center">
  {cartList.map((c) => (
    <button
      key={c.id}
      onClick={() => setType(c.label)}
      className={`px-4 py-2 rounded-full ${
        type === c.label
          ? "bg-blue-500 text-white"
          : "bg-gray-200"
      }`}
    >
      {c.label}
    </button>
  ))}
</div>
<div className="flex gap-4 mb-6">
  <div className="bg-green-500 text-white p-4 rounded-xl">
    Delivered: {stats.delivered}
  </div>
  <div className="bg-yellow-500 text-white p-4 rounded-xl">
    Pending: {stats.pending}
  </div>
  <div className="bg-red-500 text-white p-4 rounded-xl">
    Canceled: {stats.canceled}
  </div>
</div>
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
                loadOrders();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <CachedOutlined className="w-5 h-5" />
              Refresh
            </button>
          </div>
          <div className={`mt-4 text-sm ${textClass}`}>
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className={`${cardBgClass} rounded-2xl shadow-xl p-12 text-center`}>
            <RestaurantOutlinedIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3  className={`text-xl font-semibold mb-2 ${headingClass}`}>
              {searchTerm ? 'No items found' : 'No items yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by creating your first menu item'}
            </p>
        
          </div>
        ) : (
          <div style={{width:"90%"}}>
            {filteredOrders.map((order) => (
            
              <OrderCard
                key={order.id}
                order={order}s
                handleDeliveredSubmit={handleDeliveredSubmit}
                handleCanceldSubmit={handleCanceldSubmit}

              />
            ))}
          </div>
        )}
      </div>

       
      

    
     </Container>
        </>
    )
}
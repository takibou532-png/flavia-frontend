import { Button } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import "../App.css/";

import useScrollAnimation from "../hooks/useScrollAnimation";
export default function ItemUiCard({ item,handleClickOpenQuentity }) {
  const { theme } = useTheme();

  // Dynamic classes
  const bgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingClass = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const shadowClass = theme === "dark" ? "shadow-gray-700" : "shadow-lg";
   const ref = useScrollAnimation("animate-fadeup");
  return (
 

    <div
    ref={ref}
      className={`opacity-0 animate-fadeup rounded-2xl overflow-hidden ${bgClass} ${shadowClass} hover:shadow-xl transition-shadow group cursor-pointer `}
      style={{display:item.available ? "inline-block" :"none", }}
    >
      

      <div className="relative h-64 overflow-hidden" >
        <img
          src={`${item.imgUrl}`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${headingClass}`}>{item.name}</h3>
        <p className={`mb-4 ${textClass}`}>{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600">{item.price} DA</span>
          <Button color='primary' onClick={()=>{
            handleClickOpenQuentity(item);
         
          }}>add to cart</Button>
        </div>
      </div>
       
    </div>
   
  );
}

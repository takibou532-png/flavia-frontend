import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/authContext';
import { LogoutOutlined } from '@mui/icons-material';
import { ListOrdered } from 'lucide-react';
const navItems = [


  {id:2 ,label:'orders',icon :<ListOrdered className="w-5 h-5"/>},

];


export default function DeliverySidebar() {
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [message,setMessage]=useState("");
   const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {logout}=useAuth();
   const handleLougout = async (e) => {
    
        try {
            await logout(); 
        
            setMessage("you are logged out");
        } catch (err) {
            setMessage("Login failed");
        }
    };
    function toggleSidebar(){
      setIsOpen(!isOpen);
    }
const {theme,toggleTheme}=useTheme();


  return (
    <div
  className={`fixed left-0 top-0 h-screen bg-gradient-to-br
    ${theme === "light"
      ? "from-white-500 to-white-500 text-gray-700 "
      : "from-black-700 to-black-600 text-gray-100"}
    transition-[width] duration-300 z-40
    ${isOpen ? "w-60" : "w-16"}
    shadow-2xl`}
>
      {/* Header */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-gray-700 ">
        {isOpen && (
          <div className="flex items-center gap-2 font-bold text-xl">
           <img src={theme==="dark"?"Dark Mode.jpg":"Light Mode.png"} style={{height:"50px"}} />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-red-500 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <ChevronLeftIcon className="w-5 h-5 " />
          ) : (
            <MenuRoundedIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
               <Link  to={`/`}>
         <button
           
           onClick={()=>{setIsOpen(false)}}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-500 group ${
              isOpen ? '' : 'justify-center'
            }`}
          >
            <span className="text-red-400 group-hover:text-orange-300 transition-colors">
              <HomeRoundedIcon/>
            </span>
            {isOpen && (
              <span className="font-medium  group-hover:text-white transition-colors">
                {"Home"}
              </span>
            )}
          </button></Link> 
        {navItems.map((item) => (
         <Link  key={item.id} to={`/Delivery-Dashboard/${item.label}`}>
         <button
           
          onClick={()=>{setIsOpen(false)}}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-500 group ${
              isOpen ? '' : 'justify-center'
            }`}
          >
            <span className="text-red-400 group-hover:text-orange-300 transition-colors">
              {item.icon}
            </span>
            {isOpen && (
              <span className="font-medium  group-hover:text-white transition-colors">
                {item.label}
              </span>
            )}
          </button></Link> 
        ))}
               <Link  to={"/Delivery-Dashboard/settings"}>
         <button
           
          onClick={()=>{setIsOpen(false)}}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-500 group ${
              isOpen ? '' : 'justify-center'
            }`}
          >
            <span className="text-red-400 group-hover:text-orange-300 transition-colors">
             <SettingsOutlinedIcon/>
            </span>
            {isOpen && (
              <span className="font-medium  group-hover:text-white transition-colors">
                {"Setting"}
              </span>
            )}
          </button></Link> 
                
         <button
           
          onClick={()=>{setIsOpen(false) ;
               toggleTheme()}}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-500 group ${
              isOpen ? '' : 'justify-center'
            }`}
          >
            <span className="text-red-500 group-hover:text-orange-300 transition-colors">
            <DarkModeOutlinedIcon/>
            </span>
            {isOpen && (
              <span className="font-medium  group-hover:text-white transition-colors">
                {"Dark Mode"}
              </span>
            )}
          </button>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-700 p-3">
        <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500 transition-all duration-200 group ${
          isOpen ? '' : 'justify-center'
        }`} onClick={()=>{
 
          setIsOpen(false);
          handleClickOpen();
        }}>
          <LogoutOutlined className="w-5 h-5 group-hover:text-orange-300 transition-colors duration-300" />
          {isOpen && (
            <span className="font-medium  ">
              Logout
            </span>
          )}
        </button>
           <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure You Want To Logout"}
        </DialogTitle>
       
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLougout} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      </div>
     
    </div>
  );
}

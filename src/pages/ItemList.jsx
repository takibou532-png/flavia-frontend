import { useEffect, useState } from "react";
import { Button, Box, Grid as MuiGrid, Alert } from "@mui/material";
import axios from "axios";
import ItemUiCard from "../components/ItemUiCard";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ReCAPTCHA from "react-google-recaptcha";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "../App.css/";
export default function ItemList() {
  const { theme } = useTheme();
  const location = useLocation();
  const passedCategory = location.state?.category;
  const [item,setItem]=useState({categoryName:"",name:"",description:"",price:0,imgUrl:"",available:true});
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [order,setOrder]=useState({fullName:'',address:"",phoneNumber:""});
  const [cart,setCart]=useState([]);
  const [quentity,setQuentity]=useState(1);
   const [captchaValue, setCaptchaValue] = useState(null);
  // const [id,setId]=useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(passedCategory || "All");
  const itemList = categoryName==="All" ? allItems :items
  const [open, setOpen] = useState(false);
  const [openQ, setOpenQ] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenQuentity = (item) => {
    setOpenQ(true);
  
    setItem(item);
     
  };
 const addToCart = (item, quantity ) => {
  setCart(prev => {
    const existing = prev.find(i => i.itemId === item.id);

    if (existing) {
      return prev.map(i =>
        i.itemId === item.id
          ? { ...i, quantity: i.quantity + quantity }
          : i
      );
    }

    return [
      ...prev,
      {
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity
      }
    ];
  });
};




  const handleCloseQuentity = () => {
    setOpenQ(false);
  };
  // Dynamic classes based on theme
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const headingClass = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";

 

  // Load categories on mount
useEffect(() => {
  const loadCategories = async () => {
    try {
      const res = await axios.get("https://flavia-backend.onrender.com/api/categories");
      setCategories(res.data);

      // Set default category only once
      // if (!passedCategory) {
      //   setCategoryName("All");
      // }
    } catch (err) {
      console.error("Category load error: ", err);
    }
  };
  loadCategories();
}, []);


  // Load items when category changes
  useEffect(() => {
    if (!categoryName || categoryName === "All") return;
    const loadItems = async () => {
      try {
        const res = await axios.get(
          `https://flavia-backend.onrender.com/api/items/category/${categoryName}`
        );
        setItems(res.data);
      } catch (err) {
        console.error("Items load error: ", err);
      }
    };
    loadItems();
  }, [categoryName]);
    useEffect(() => {
    if (!categoryName) return;
    const loadAllItems = async () => {
      try {
        const res = await axios.get(
          `https://flavia-backend.onrender.com/api/items`
        );
        setAllItems(res.data);
      } catch (err) {
        console.error("Items load error: ", err);
      }
    };
    loadAllItems();
  }, []);




  const handleOrderSubmit = async () => {
      if (!captchaValue) {
     alert("captcha error");
    return;
  }
  const newOrder = {
    fullName:order.fullName,
    phoneNumber:order.phoneNumber,
    address:order.address,
    items: cart.map(item => ({
      itemId: item.itemId,
      quentity: item.quantity
      
    }))
  };

  try {
    const res = await axios.post(
      "https://flavia-backend.onrender.com/api/orders",
      newOrder,
      {
        withCredentials:true,
         headers: { "Content-Type": "application/json" }
      }
    
    );

  

    setCart([]); 
    setSuccessOpen(true);
    setCaptchaValue(null);
    setOrder({
  fullName: "",
  address: "",
  phoneNumber: ""
});
    setOpen(false);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <Box sx={{ p: 3, width: "100%", marginTop: "60px" }} className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}  transition-colors duration-300`} >
      {/* Category Buttons */}
      <MuiGrid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
         <Button
              onClick={() => {
                setCategoryName("All")
              }}
              variant={ categoryName==="All" ? "contained" : "text"}
              color={categoryName==="All" ? "primary" : "inherit"}
               sx={{
    textTransform: "capitalize",
    px: 3,
    borderRadius: "999px",
    transition: "all 0.3s",
    fontWeight: 600,
  
    "&:hover": {
      transform: "scale(1.08)",
    },
  }}
            >All</Button>
        {categories.map((cat) => (
          <MuiGrid item key={cat.id}>
     <Button
  onClick={() => setCategoryName(cat.name)}
  variant={categoryName === cat.name ? "contained" : "text"}
  color={categoryName === cat.name ? "primary" : "inherit"}
  sx={{
    textTransform: "capitalize",
    px: 3,
    borderRadius: "999px",
    transition: "all 0.3s",
    fontWeight: 600,
    ...(categoryName === cat.name && {
      boxShadow: "0 4px 15px rgba(255,0,0,0.3)",
      transform: "scale(1.05)",
    }),
    "&:hover": {
      transform: "scale(1.08)",
    },
  }}
>{cat.name}</Button>
          </MuiGrid>
        ))}
      </MuiGrid>

      {/* Items Section */}
      <div className={`${bgClass} py-16 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${headingClass}`
          }   style={{ animation: "fadeSlideUp 0.6s ease" }} >Our Menu</h2>
            <p className={`text-lg ${textClass}`}  style={{ animation: "fadeSlideUp 0.6s ease" }}>
              you can see any meal according to its category
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {
          
            itemList.map((item,index) => (
              
              
              <ItemUiCard key={item.id} item={item}  handleClickOpenQuentity={handleClickOpenQuentity}  addToCart={addToCart}/>
            ))}
          </div>
        </div>
      </div>
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>PLACE ORDER</DialogTitle>
        <DialogContent>
          <DialogContentText>
          
          </DialogContentText>
          <form   id="order-form"
  onSubmit={(e) => {
    e.preventDefault();
    handleOrderSubmit();
  }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="full Name"
              type="text"
              fullWidth
              variant="standard"
              value={order.fullName}
              onChange={(e)=>{
                setOrder({...order,fullName:e.target.value})
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
                value={order.address}
              onChange={(e)=>{
                setOrder({...order,address:e.target.value})
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Phone Number"
              type="text"
              fullWidth
              variant="standard"
                value={order.phoneNumber}
              onChange={(e)=>{
                setOrder({...order,phoneNumber:e.target.value})
              }}
            />
          </form>
          <ReCAPTCHA
  sitekey="6Lc7WqYsAAAAACj4pc4ZeK63ysM6WmVLLMwyhsjP"
  onChange={(value) => setCaptchaValue(value)}
/>
          {cart.map(item => (
  <p key={item.itemId}>
    {item.name} x {item.quantity}
  </p>
))}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose()
            setCart([]);
          }}>Cancel</Button>
          <Button type="submit" form="order-form">
           ORDER NOW 
          </Button>
        </DialogActions>
       

      </Dialog>

       <Dialog open={openQ} onClose={handleCloseQuentity}>
        <DialogTitle>  Enter the quentity you want from this meal </DialogTitle>
        <DialogContent>
          <DialogContentText>
         
          </DialogContentText>
          <form onSubmit={(e)=>{
            e.preventDefault();
            addToCart(item,quentity);
           handleCloseQuentity();
           setQuentity(1);
          }}  id="quentity_dialog">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="Quentity"
              label="Quentity"
              type="number"
              
              fullWidth
              variant="standard"
              onChange={(e)=>{
                setQuentity(Number(e.target.value));
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQuentity}>Cancel</Button>
          <Button type="submit" form="quentity_dialog">
           Submit
          </Button>
        </DialogActions>
      </Dialog> 
         <Button
  variant="contained"
  sx={{
    position: "fixed",
    bottom: 20,
    right: 20,
    borderRadius: "30px",
    px: 4,
    py: 1.5,
    fontWeight: "bold",
    zIndex: 1000,
    animation: "floatingBtn 3s ease-in-out infinite",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    "&:hover": {
      transform: "scale(1.1)",
      animation: "softGlow 1.5s infinite",
    },
  }}
  style={{ display: cart.length === 0 ? "none" : "block" }}
  onClick={handleClickOpen}
>
  🛒 PLACE ORDER ({cart.length})
</Button>
          <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}  PaperProps={{
    sx: {
      borderRadius: 4,
      animation: "scaleIn 0.3s ease",
    },
  }}>
  <DialogTitle>✅ Order Confirmed</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Your order has been placed successfully 🎉 <br />
      We will contact you soon!
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setSuccessOpen(false)}>OK</Button>
  </DialogActions>
</Dialog>
    </Box>
  );
}

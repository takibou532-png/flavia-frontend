
import { useEffect,useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import  Container  from "@mui/material/Container";

import axios from "axios";

import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ItemCard from "../components/ItemCard";
import { CachedOutlined } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";
import Upload from "../components/Upload";

export default function ItemService(){
     const [item,setItem]=useState({categoryName:"",name:"",description:"",price:0,imgUrl:"",available:true});
      const [items,setItems]=useState([]);
      const [id,setId]=useState(0);
       const [filteredItems, setFilteredItems] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [isLoading, setIsLoading] = useState(true);
      const [open, setOpen] = useState(false);  
      const [openEdite, setOpenEdite] = useState(false);  
      const [openDelete, setOpenDelete] = useState(false);  
      const [showUpload,setShowUpload]=useState(false);


//  search for itms :
        useEffect(() => {
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);
         
// open Edite
  const handleEditeClickOpen = (id,item) => {
 setItem(item);
 setId(id);
 setOpenEdite(true);
  };
  // =========== onUpload=======================
  
  const handleEditeClose = () => {
    setOpenEdite(false);
  };
  // open Delete
  const handleDeleteClickOpen = (id) => {
 
 setId(id);
 setOpenDelete(true);
  };
  
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
  // open Add
  const handleAddClickOpen = () => {
    setItem({ 
    categoryName:"",
    name: "",
    description: "",
    price: 0,
    imgUrl: "",
    available: true
  });
 setOpen(true);
  };

  const handleAddClose = () => {
    setOpen(false);
  };
  // =====theme stuff ================
  const {theme}=useTheme();
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const cardBgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingClass = theme === "dark" ? "text-white" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";

// get All Items
    useEffect(()=>{
        const loadItems= async ()=>  {
        try{
        const res = await axios.get("http://localhost:8080/api/items");
         setItems(res.data);
            console.log(res.data);
        }catch (err) {
        console.error("Item failed to load "+err)
        }finally {
      setIsLoading(false);
    }
    }
    loadItems();
        
    },[])
    // handle Edite Submite
 async function handleEditeSubmit(id, updatedItem) {
  try {
    await axios.put(
      `http://localhost:8080/api/admin/items/${id}`,
      updatedItem,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    // Update ONLY the edited item
    setItems(prev =>
      prev.map(it => (it.id === id ? updatedItem : it))
    );

  } catch (err) {
    console.error("Item update error:", err);
  }
}
    // handle Add Submite
    function handleAddSubmit(item){
    const handleAdd=async(item)=>{
        try{
        res =await axios.post("http://localhost:8080/api/admin/items",item,
            {withCredentials:true,
                headers:{"Content-Type" :"application/json"}
            }

        )
        console.log(res.data)
    }catch(err){
        console.error("item post err "+err);
    }
  }
handleAdd(item);
  
}


  function handleDeleteSubmit(id){
    const handleDelete = async(id)=>{
     try{
      const res =await axios.delete(`http://localhost:8080/api/admin/items/${id}`,
          {withCredentials:true,
                headers:{"Content-Type" :"application/json"}
            }
      )
      console.log(res);
     }catch(err){
      console.log("delete item error "+err);
     }

    }
    handleDelete(id);
    setItems(items.filter((cat)=> cat.id !=id))
  }
   



     
    



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
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-orange-600/80" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <div className="flex items-center gap-3 mb-4">
            <RestaurantOutlinedIcon className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Menu Management</h1>
          </div>
          <p className="text-xl text-white/90 mb-8 text-center max-w-2xl">
            Create, update, and manage your menu items with ease
          </p>
          <button
            onClick={handleAddClickOpen}
            className="flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-2xl hover:scale-105 transform"
          >
            <AddOutlinedIcon className="w-5 h-5" />
            Create New Item
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        <div className={`${cardBgClass} rounded-2xl shadow-xl p-6 mb-8`}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <SearchOutlinedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={()=>{
                loadItems();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <CachedOutlined className="w-5 h-5" />
              Refresh
            </button>
          </div>
          <div className={`mt-4 text-sm ${textClass}`}>
            Showing {filteredItems.length} of {items.length} items
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500" />
          </div>
        ) : filteredItems.length === 0 ? (
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
            {!searchTerm && (
              <button
                onClick={handleAddClickOpen}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium"
              >
                <AddOutlinedIcon className="w-5 h-5" />
                Create First Item
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                handleEditeClickOpen={handleEditeClickOpen}
                handleDeleteClickOpen={handleDeleteClickOpen}
                handleEditeSubmit={handleEditeSubmit}
              />
            ))}
          </div>
        )}
      </div>

       
      
{/* Create dialoge  */}
              <Dialog open={open} onClose={handleAddClose}>
        <DialogTitle>Create item</DialogTitle>
        <DialogContent>
          <DialogContentText>
          
          </DialogContentText>
          <form onSubmit={()=>{
            handleAddSubmit(item)
          }} id="subscription-form">
            <TextField
            value={item.categoryName}
            onChange={(e)=>{setItem({...item,categoryName:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Category Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
            value={item.name}
            onChange={(e)=>{setItem({...item,name:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
          
            <TextField
               value={item.description}
               onChange={(e)=>{setItem({...item,description:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
            
            <TextField
               value={item.price}
               onChange={(e)=>{setItem({...item,price:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Price"
              type="text"
              fullWidth
              variant="standard"
            />
          <Upload onUploaded={(url)=>{
            setItem({...item,imgUrl:url})
          }}/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edite dialoge  */}
             <Dialog open={openEdite} onClose={handleEditeClose}>
        <DialogTitle>Edite Menu Item</DialogTitle>
        <DialogContent>
          
             <form onSubmit={()=>{
            handleEditeSubmit(id,item)
          }} id="subscription-form">
            <TextField
            value={item.categoryName}
            onChange={(e)=>{setItem({...item,categoryName:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Category Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
            value={item.name}
            onChange={(e)=>{setItem({...item,name:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
          
            <TextField
               value={item.description}
               onChange={(e)=>{setItem({...item,description:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
            
            <TextField
               value={item.price}
               onChange={(e)=>{setItem({...item,price:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Price"
              type="text"
              fullWidth
              variant="standard"
            />
            <Button onClick={()=>{setShowUpload(!showUpload)}} variant="contained" sx={{margin:"7px"}}>{showUpload?"Cansel":"Upload Image"}</Button>
            <div style={{display:showUpload ?"block":"none"}}>
         <Upload  onUploaded={(url)=>{
            setItem({...item,imgUrl:url})
          }} />
          </div>
               <div className="relative h-64 overflow-hidden" style={{display:showUpload?"none":"inline"}}>
        <img
          src={`${item.imgUrl}`}
          alt={item.name}
          className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditeClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Edite
          </Button>
        </DialogActions>
      </Dialog>

{/* ===========Edite dialoge======== */}
{/*  Delete Dialoge  */}
    <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure You Want To Delete This item"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
       
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={()=>{
            handleDeleteSubmit(id);
            handleDeleteClose();
          }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
{/* End Delete Dialoge */}

    
     </Container>
        </>
    )
}
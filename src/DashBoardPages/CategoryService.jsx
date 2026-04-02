import { useEffect,useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import  Container  from "@mui/material/Container";
import  IconButton  from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ItemCard from "../components/ItemCard";
import { CachedOutlined } from "@mui/icons-material";
import axios from "axios";
import  Typography  from "@mui/material/Typography";
import CategoryIcon from '@mui/icons-material/Category';

import CategoryCard from "../components/CtegoryCard";
import { useTheme } from "../context/ThemeContext";
import Upload from "../components/Upload";



export default function CategoryService(){
      const [category,setCategory]=useState({name:"",description:"",imgUrl:''});
      const [categories,setCategories]=useState([]);
      const [id,setId]=useState(0);
      const [filteredCastegories, setFilteredCategories] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [isLoading, setIsLoading] = useState(true);
      const [open, setOpen] = useState(false);  
      const [openEdite, setOpenEdite] = useState(false);  
      const [openDelete, setOpenDelete] = useState(false);  
      const [showUpload,setShowUpload]=useState(false);

// search for categories
      useEffect(() => {
    const filtered = categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);
         
// open Edite
  const handleEditeClickOpen = (id,category) => {
 setCategory(category);
 setId(id);
 setOpenEdite(true);
  };
  
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
 setOpen(true);
  };

  const handleAddClose = () => {
    setOpen(false);
  };

const {theme}=useTheme();
// get All categories
    useEffect(()=>{
        const loadCategories= async ()=>  {
        try{
        const res = await axios.get("http://localhost:8080/api/categories");
         setCategories(res.data);

        }catch (err) {
        console.error("category failed to load "+err)
        }finally{
          setIsLoading(false)
        }
    }
    loadCategories();
        
    },[])
    // handle Edite Submite
    function handleEditeSubmit(id,category){
     const handleEdite= async(id,category)=>{
      try{
        const res=await axios.put(`http://localhost:8080/api/admin/categories/${id}`,category,{
          withCredentials:true,
          
                   headers:{"Content-Type" :"application/json"}
          
        })
      }catch(err){
        console.error("category update Error "+err);
      }
     }
     handleEdite(id,category);
     setCategories(categories.map((cat)=>{
      return {...cat,name:category.name,description:category.description,imgUrl:category.imgUrl}
     }))
    }
    // handle Add Submite
    function handleAddSubmit(category){
    const handleAdd=async(category)=>{
        try{
        res =await axios.post("http://localhost:8080/api/admin/categories",category,
            {withCredentials:true,
                headers:{"Content-Type" :"application/json"}
            }

        )
        console.log(res.data)
    }catch(err){
        console.error("category post err "+err);
    }
  }
handleAdd(category)


  
}


  function handleDeleteSubmit(id){
    const handleDelete = async(id)=>{
     try{
      const res =await axios.delete(`http://localhost:8080/api/admin/categories/${id}`,
          {withCredentials:true,
                headers:{"Content-Type" :"application/json"}
            }
      )
      console.log(res);
     }catch(err){
      console.log("delete category error "+err);
     }

    }
    handleDelete(id);
    setCategories(categories.filter((cat)=> cat.id !=id))
  }
   


  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const cardBgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingClass = theme === "dark" ? "text-white" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
     
    


    return(
      <>
   <Container 
            className={`min-h-screen ${bgClass} transition-colors`} sx={{ marginLeft: "140px" }}>
         <div className="relative h-80 overflow-hidden rounded-xl" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-orange-600/80" />
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="flex items-center gap-3 mb-4 text-white">
            <CategoryIcon className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Categories Management</h1>
          </div>
          <p className="text-xl text-white/90 mb-8 text-center max-w-2xl">
            Create, update, and delete your menu categories with ease
          </p>
          <button onClick={handleAddClickOpen} className="flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-2xl hover:scale-105 transform">
            <AddOutlinedIcon className="w-5 h-5" /> Create New Category
          </button>
        </div>
      </div>

      {/* Search & List */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10`}>
        <div className={`${cardBgClass} rounded-2xl shadow-xl p-6 mb-8`}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <SearchOutlinedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
              <CachedOutlined className="w-5 h-5" /> Refresh
            </button>
          </div>
          <div className={`mt-4 text-sm ${textClass}`}>
            Showing {filteredCastegories.length} of {categories.length} items
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500" />
          </div>
        ) : filteredCastegories.length === 0 ? (
          <div className={`${cardBgClass} rounded-2xl shadow-xl p-12 text-center`}>
            <RestaurantOutlinedIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className={`text-xl font-semibold mb-2 ${headingClass}`}>
              {searchTerm ? "No categories found" : "No categories yet"}
            </h3>
            <p className={`mb-6 ${textClass}`}>
              {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first category"}
            </p>
            {!searchTerm && (
              <button onClick={handleAddClickOpen} className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium">
                <AddOutlinedIcon className="w-5 h-5" /> Create First Category
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {filteredCastegories.map((cat) => (
              <CategoryCard key={cat.id} item={cat} handleEditeClickOpen={handleEditeClickOpen} handleDeleteClickOpen={handleDeleteClickOpen} />
            ))}
          </div>
        )}
      </div>

{/* Create dialoge  */}
              <Dialog className={``} open={open} onClose={handleAddClose}>
        <DialogTitle>Create Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
          
          </DialogContentText>
          <form onSubmit={()=>{
            handleAddSubmit(category)
          }} id="subscription-form">
            <TextField
            value={category.name}
            onChange={(e)=>{setCategory({...category,name:e.target.value})}}
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
               value={category.description}
               onChange={(e)=>{setCategory({...category,description:e.target.value})}}
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
             <Upload onUploaded={(url)=>{
                      setCategory({...category,imgUrl:url})
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
        <DialogTitle>Edite Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
         
          </DialogContentText>
          <form onSubmit={()=>{
            handleEditeSubmit(id,category)
          }} id="subscription-form">
            <TextField
            value={category.name}
            onChange={(e)=>{setCategory({...category,name:e.target.value})}}
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
               value={category.description}
               onChange={(e)=>{setCategory({...category,description:e.target.value})}}
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
                   <Button onClick={()=>{setShowUpload(!showUpload)}} variant="contained" sx={{margin:"7px"}}>{showUpload?"Cansel":"Upload Image"}</Button>
            <div style={{display:showUpload ?"block":"none"}}>
         <Upload  onUploaded={(url)=>{
            setCategory({...category,imgUrl:url})
          }} />
          </div>
               <div className="relative h-64 overflow-hidden" style={{display:showUpload?"none":"inline"}}>
        <img
          src={`${category.imgUrl}`}
          alt={category.name}
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
          {"Are You Sure You Want To Delete This Category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        you will lost all the food menu inside this category
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
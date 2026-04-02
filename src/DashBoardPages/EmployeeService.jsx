
import { useEffect,useState } from "react";
import  Box  from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import  Container  from "@mui/material/Container";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import axios from "axios";

import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmployeeCard from "../components/EmployeeCard";
import { CachedOutlined } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";
import Upload from "../components/Upload";
import {  DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";
import DeliveryCard from "../components/DeliveryCard";
const today = dayjs();

const todayStartOfTheDay = today.startOf('day');
export default function EmployeeService(){
     const [employee,setEmployee]=useState({fullName:"",dailySalery:0,startWorkAt:"",endWorkAt:"",faceImgUrl:""});
     const [employees,setEmployees]=useState([]);
      const [id,setId]=useState(0);
       const [filteredEmployees, setFilteredEmployees] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [isLoading, setIsLoading] = useState(true);
      const [open, setOpen] = useState(false);  
      const [openD, setOpenD] = useState(false);  
      const [openEditeD, setOpenEditeD] = useState(false);  
      const [openDeleteD, setOpenDeleteD] = useState(false);  
      const [openEdite, setOpenEdite] = useState(false);  
      const [openDelete, setOpenDelete] = useState(false);  
      const [showUpload,setShowUpload]=useState(false);
      const [delivery,setDelivery]=useState({fullname:"",email:"",password:""})
      const [deliveries,setDeliveries]=useState();


//  search for itms :
        useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) 
       
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);


         
// open Edite
  const handleEditeClickOpen = (id,employee) => {
 setEmployee(employee);
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
  const handleDeleteCloseD = () => {
    setOpenDeleteD(false);
  };
  // open Add
  const handleAddClickOpen = () => {
    setEmployee({ 
 fullName:"",dailySalery:0,startWorkAt:"00:00",endWorkAt:"00:00",faceImgUrl:""
  });
 setOpen(true);
  };

  const handleAddClose = () => {
    setOpen(false);
  };
  const handleAddCloseD = () => {
    setOpenD(false);
  };
  const handleOpenD = () => {
    setOpenD(true);
  };
  const handleEditeClickOpenD = (id,delivery) => {
   
    setId(id);
    setDelivery(delivery)
    setOpenEditeD(true);
  };
  const handleDeleteClickOpenD = (id,delivery) => {
    setId(id);
   
    setOpenDeleteD(true);
  };
  // =====theme stuff ================
  const {theme}=useTheme();
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const cardBgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingClass = theme === "dark" ? "text-white" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";

// get All employees
    useEffect(()=>{
        const loadEmployees= async ()=>  {
        try{
        const res = await axios.get("https://flavia-backend.onrender.com/api/admin/employees",
          {withCredentials:true}
        );
         setEmployees(res.data);
            console.log(res.data);
        }catch (err) {
        console.error("employee failed to load "+err)
        }finally {
      setIsLoading(false);
    }
    }
    loadEmployees();
        
    },[])
    useEffect(()=>{
        const loadDeliveries= async ()=>  {
        try{
        const res = await axios.get("https://flavia-backend.onrender.com/delivery/get-deliveries",
          {withCredentials:true}
        );
         setDeliveries(res.data);
            console.log(res.data);
        }catch (err) {
        console.error("Delivery failed to load "+err)
        }finally {
      setIsLoading(false);
    }
    }
    loadDeliveries();
        
    },[])
    // handle Edite Submite
 async function handleEditeSubmit(id, updatedemployee) {
  try {
    await axios.put(
      `https://flavia-backend.onrender.com/api/admin/employees/${id}`,
      updatedemployee,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    // Update ONLY the edited employee
    setEmployees(prev =>
      prev.map(emp => (emp.id === id ? updatedemployee : emp))
    );

  } catch (err) {
    console.error("employee update error:", err);
  }
}


// Update delevery
 async function handleEditeSubmitD(id, delivery) {
  
  try {
    await axios.put(
      `https://flavia-backend.onrender.com/delivery/${id}`,
  {fullname:delivery.fullname,email:delivery.email},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    // Update ONLY the edited employee
    setDeliveries(prev =>
      prev.map(del => (del.id === id ? delivery : del))
    );

  } catch (err) {
    console.error("Delivery update error:", err);
  }
}



    // handle Add Submite
  async function handleAddSubmit(employee){
  try{
    const res = await axios.post(
      "https://flavia-backend.onrender.com/api/admin/employees",
      employee,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log(res.data);

   

  } catch(err){
    console.error("employee post err", err);
  }
}
//  CREATE  DELIVERY SUBMIT
  async function handleAddSubmitD(delivery){
  try{
    const res = await axios.post(
      "https://flavia-backend.onrender.com/delivery/createDelivery",
      delivery,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log(res.data);

   

  } catch(err){
    console.error("Delivery create err", err);
  }
}


// DELETE EMPLOYEE
  function handleDeleteSubmit(id){
    const handleDelete = async(id)=>{
     try{
      const res =await axios.delete(`https://flavia-backend.onrender.com/api/admin/employees/${id}`,
          {withCredentials:true,
                headers:{"Content-Type" :"application/json"}
            }
      )
      console.log(res);
     }catch(err){
      console.log("delete employee error "+err);
     }

    }
    handleDelete(id);
    setEmployees(employees.filter((cat)=> cat.id !=id))
  }
  // DELETE DELIVERY


  function handleDeleteSubmitD(id){
    const handleDeleteD = async(id)=>{
     try{
      const res =await axios.delete(`https://flavia-backend.onrender.com/delivery/${id}`,
          {withCredentials:true,
                headers:{"Content-Type" :"application/json"}
            }
      )
      console.log(res);
     }catch(err){
      console.log("delete delivery error "+err);
     }

    }
    handleDeleteD(id);
    setDeliveries(deliveries.filter((del)=> del.id !=id))
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
        <div className="relative h-full flex flex-col employees-center justify-center text-white px-4">
          <div className="flex employees-center gap-3 mb-4">
            <RestaurantOutlinedIcon className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Employee Management</h1>
          </div>
          <p className="text-xl text-white/90 mb-8 text-center max-w-2xl">
            Create, update, and manage your  employees with ease
          </p>
          <button
            onClick={handleAddClickOpen}
            className="flex employees-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-2xl hover:scale-105 transform"
          >
            <AddOutlinedIcon className="w-5 h-5" />
            Create New employee
          </button>
          <button
            onClick={handleOpenD}
            className="flex employees-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-2xl hover:scale-105 transform"
          >
            <AddOutlinedIcon className="w-5 h-5" />
            Create New Delivery
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        <div className={`${cardBgClass} rounded-2xl shadow-xl p-6 mb-8`}>
          <div className="flex flex-col sm:flex-row gap-4 employees-center justify-between">
            <div className="relative flex-1 w-full">
              <SearchOutlinedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <button
           
              className="flex employees-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <CachedOutlined className="w-5 h-5" />
              Refresh
            </button>
          </div>
          <div className={`mt-4 text-sm ${textClass}`}>
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </div>

        {isLoading ? (
          <div className="flex employees-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500" />
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className={`${cardBgClass} rounded-2xl shadow-xl p-12 text-center`}>
            <RestaurantOutlinedIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3  className={`text-xl font-semibold mb-2 ${headingClass}`}>
              {searchTerm ? 'No employees found' : 'No employees yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by creating your first menu employee'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddClickOpen}
                className="inline-flex employees-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium"
              >
                <AddOutlinedIcon className="w-5 h-5" />
                Create First employee
              </button>
            )}
          </div>
        ) : (
            <div className={`${bgClass} grid grid-cols-2 md:grid-cols-2 gap-8`}>
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                emp={employee}
                handleEditeClickOpen={handleEditeClickOpen}
                handleDeleteClickOpen={handleDeleteClickOpen}
                
              />
            ))}
            {deliveries.map((del) => (
              <DeliveryCard
                key={del.id}
                delivery={del}
                handleEditeClickOpenD={handleEditeClickOpenD}
                handleDeleteClickOpenD={handleDeleteClickOpenD}
             
                
              />
            ))}

          </div>
        )}
      </div>

       
      
{/* Create Emloyee dialoge  */}
              <Dialog open={open} onClose={handleAddClose}>
        <DialogTitle>Create employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
          
          </DialogContentText>
          <form onSubmit={(e)=>{
            e.preventDefault();
            handleAddSubmit(employee)
            setOpen(false);
          }} id="subscription-form">
        
            <TextField
            value={employee.fullName}
            onChange={(e)=>{setEmployee({...employee,fullName:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="fullName"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
            value={employee.dailySalery}
            onChange={(e)=>{setEmployee({...employee,dailySalery:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="dailySalery"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
            value={employee.startWorkAt}
            onChange={(e)=>{setEmployee({...employee,startWorkAt:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="startWorkAt"
              type="time"
              fullWidth
         
              variant="standard"
            />
            <TextField
            value={employee.endWorkAt}
            onChange={(e)=>{setEmployee({...employee,endWorkAt:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="endWorkAt"
              type="time"
              fullWidth
          
              variant="standard"
            />

          
          
         
          
          <Upload onUploaded={(url)=>{
            setEmployee({...employee,faceImgUrl:url})
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



      {/* Create delivery dialog */}
              <Dialog open={openD} onClose={handleAddCloseD}>
        <DialogTitle>Create Delivery</DialogTitle>
        <DialogContent>
          <DialogContentText>
          
          </DialogContentText>
          <form onSubmit={(e)=>{
            e.preventDefault();
            handleAddSubmitD(delivery)
            setOpenD(false);
          }} id="subscription-form">
        
            <TextField
            value={delivery.fullname}
            onChange={(e)=>{setDelivery({...delivery,fullname:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="fullName"
              type="text"
              fullWidth
              variant="standard"
            />
         
          
            <TextField
            value={delivery.email}
            onChange={(e)=>{setDelivery({...delivery,email:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="email"
              type="email"
              fullWidth
          
              variant="standard"
            />
            <TextField
            value={delivery.password}
            onChange={(e)=>{setDelivery({...delivery,password:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="email"
              type="password"
              fullWidth
          
              variant="standard"
            />

          
          
         
          
        
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCloseD}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Add 
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edite Delivery Dialog */}

              <Dialog open={openEditeD} onClose={()=>{
                setOpenEditeD(false);
              }}>
        <DialogTitle>Edite  Delivery</DialogTitle>
        <DialogContent>
          <DialogContentText>
          
          </DialogContentText>
          <form onSubmit={(e)=>{
            e.preventDefault();
            handleEditeSubmitD(id,delivery)
            setOpenEditeD(false);
          }} id="subscription-form">
        
            <TextField
            value={delivery.fullname}
            onChange={(e)=>{setDelivery({...delivery,fullname:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="fullName"
              type="text"
              fullWidth
              variant="standard"
            />
         
          
            <TextField
            value={delivery.email}
            onChange={(e)=>{setDelivery({...delivery,email:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="email"
              type="email"
              fullWidth
          
              variant="standard"
            />
          

          
          
         
          
        
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpenEditeD(false)}}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Edite 
          </Button>
        </DialogActions>
      </Dialog>



















      {/* Edite dialoge  */}
             <Dialog open={openEdite} onClose={handleEditeClose}>
        <DialogTitle>Edite Employees</DialogTitle>
        <DialogContent>
          
             <form onSubmit={()=>{
            handleEditeSubmit(id,employee)
          }} id="subscription-form">
                  <TextField
            value={employee.fullName}
            onChange={(e)=>{setEmployee({...employee,fullName:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="fullName"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
            value={employee.dailySalery}
            onChange={(e)=>{setEmployee({...employee,dailySalery:e.target.value})}}
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
            value={employee.startWorkAt}
            onChange={(e)=>{setEmployee({...employee,startWorkAt:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="startWorkAt"
              type="time"
              fullWidth
         
              variant="standard"
            />
            <TextField
            value={employee.endWorkAt}
            onChange={(e)=>{setEmployee({...employee,endWorkAt:e.target.value})}}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="endWorkAt"
              type="time"
              fullWidth
          
              variant="standard"
            />
    
        
            <Button onClick={()=>{setShowUpload(!showUpload)}} variant="contained" sx={{margin:"7px"}}>{showUpload?"Cansel":"Upload Image"}</Button>
            <div style={{display:showUpload ?"block":"none"}}>
         <Upload  onUploaded={(url)=>{
            setEmployee({...employee,faceImgUrl:url})
          }} />
          </div>
               <div className="relative h-64 overflow-hidden" style={{display:showUpload?"none":"inline"}}>
        <img
          src={`${employee.faceImgUrl}`}
          alt={employee.fullName}
          className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditeClose}>Cancel</Button>
          <Button type="submit" form="subscription-form" >
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
          {"Are You Sure You Want To Delete This employee"}
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
{/*  Delete Delivery Dialoge  */}
    <Dialog
        open={openDeleteD}
        onClose={handleDeleteCloseD}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure You Want To Delete This Delivery"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
       
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCloseD}>Cancel</Button>
          <Button onClick={()=>{
            handleDeleteSubmitD(id);
            handleDeleteCloseD();
          }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
{/* End Delete Delivery Dialoge */}

    
     </Container>
        </>
    )
}
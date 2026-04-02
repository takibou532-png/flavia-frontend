
import { useTheme } from "../context/ThemeContext";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditIcon from '@mui/icons-material/Edit';
import EventBusyIcon from '@mui/icons-material/EventBusy';

export default function ItemCard({item,handleEditeClickOpen,handleDeleteClickOpen,handleEditeSubmit}){
  const { theme } = useTheme();

  // Dynamic classes
  const bgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingClass = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const shadowClass = theme === "dark" ? "shadow-gray-700" : "shadow-lg";


return(
     <div style={{ margin:2.5,borderRadius:"10px"}} className={`rounded-2xl overflow-hidden ${bgClass} ${shadowClass} hover:shadow-xl transition-shadow group cursor-pointer`}>
                <CardMedia
  component="img"
  image={`${item.imgUrl}`}
  alt="Item picture"
  sx={{
    height: 160,
    width: "100%",
    objectFit: "cover",
  }}
  className="rounded-md transition-transform duration-300 hover:scale-105"
/>
        
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className={`text-xl font-bold mb-2 ${headingClass}`}>
          {item.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" className='text-red-500'>
          {item.price} DA 
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} className={`mb-4 ${textClass}`}>
        {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color='secondary' onClick={()=>{
          handleDeleteClickOpen(item.id)
        }} ><DeleteOutlineOutlinedIcon/></IconButton>
       
        <IconButton  color='secondary' size="small" onClick={()=>{

          handleEditeClickOpen(item.id,item);
        }}><EditIcon/></IconButton>
       
        <IconButton size="small" color={item.available ?"success" :"error"} onClick={()=>{
               const updatedItem = {
    ...item,
    available: !item.available
  };

  handleEditeSubmit(item.id, updatedItem);
        
        }}>{item.available ? <EventAvailableIcon/> :<EventBusyIcon/>}</IconButton>
       
      </CardActions>
    </div>
)


}
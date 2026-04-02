import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from "../context/ThemeContext";

export default function CategoryCard({ item, handleEditeClickOpen, handleDeleteClickOpen }) {
  const { theme } = useTheme();

  // Theme-aware classes
  const cardBgClass = theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <div style={{ margin: 2.5, borderRadius: "10px" }} className={`${cardBgClass} transition-colors `}>
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
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" sx={{ color: textSecondary }}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="secondary" onClick={() => handleDeleteClickOpen(item.id)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
        <IconButton color="secondary" size="small" onClick={() => handleEditeClickOpen(item.id, { name: item.name, description: item.description, imgUrl: item.imgUrl })}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </div>
  );
}

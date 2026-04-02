
import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Box,
  Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import EmailIcon from "@mui/icons-material/Email";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

export default function DeliveryCard({
  delivery,
  handleEditeClickOpenD,
   handleDeleteClickOpenD

}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        mb: 2,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
                 
            sx={{ bgcolor: red[500], fontWeight: "bold" }}
          >
        
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography fontWeight="bold" fontSize="1.1rem">
            {delivery.fullname}
          </Typography>
        }
        subheader={
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary">
            
            </Typography>
          </Box>
        }
      />

      <Divider />

      {/* Main Info */}
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
         <Box display="flex" alignItems="center" gap={1}>
            <EmailIcon fontSize="small" />
            <Typography variant="body1">
              {delivery.email}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            ID: # {delivery.id}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions disableSpacing>
        <IconButton
          color="primary"
          onClick={()=>{
            handleEditeClickOpenD(delivery.id,delivery);
          }}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
        onClick={()=>{
            handleDeleteClickOpenD(delivery.id);
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>

      
      </CardActions>

   
    </Card>
  );
}
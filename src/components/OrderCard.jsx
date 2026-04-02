import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function OrderCard({ order, handleDeliveredSubmit, handleCanceldSubmit }) {
  return (
    <Accordion sx={{ borderRadius: "16px", overflow: "hidden", mb: 2,width:"100%",display:order.orderStatus!="PENDING"?"none":"inline-block"}}>
      
      {/* HEADER */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ width: "100%" }}>
          
          {/* Top row */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" color="primary">
              Order #{order.id}
            </Typography>

            <Typography
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: "12px",
                backgroundColor:
                  order.orderStatus === "DELIVERED"
                    ? "#4CAF50"
                    : order.orderStatus === "CANCELED"
                    ? "#F44336"
                    : "#FFC107",
                color: "white",
                fontSize: "12px",
              }}
            >
              {order.orderStatus}
            </Typography>
          </Box>

          {/* Price */}
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            💰 Total: <strong>{order.totalPrice} DA</strong>
          </Typography>

        </Box>
      </AccordionSummary>

      {/* DETAILS */}
      <AccordionDetails>

        {/* Customer Info */}
        <Box sx={{ mb: 2 }}>
          <Typography><strong>Name:</strong> {order.fullName}</Typography>
          <Typography><strong>Phone:</strong> {order.phoneNumber}</Typography>
          <Typography><strong>Address:</strong> {order.address}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(order.createdAt).toLocaleString()}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* ITEMS LIST */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            🧾 Order Items:
          </Typography>

          {order.items.map((item) => (
            <Box
              key={item.itemId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
                p: 1,
                borderRadius: "8px",
                backgroundColor: "#f9f9f9"
              }}
            >
              <Typography color='secondary'>
                {item.name} × {item.quantity}
              </Typography>

              <Typography color="secondary">
                {item.price * item.quantity} DA
              </Typography>
            </Box>
          ))}
        </Box>

      </AccordionDetails>

      {/* ACTIONS */}
      <AccordionActions>

      
          <>
            <Button
              color="error"
              startIcon={<CancelOutlinedIcon />}
              onClick={() => handleCanceldSubmit(order.id)}
            >
              Cancel
            </Button>

            <Button
              color="success"
              startIcon={<LocalShippingOutlinedIcon />}
              onClick={() => handleDeliveredSubmit(order.id)}
            >
              Delivered
            </Button>
          </>
    

      </AccordionActions>
    </Accordion>
  );
}
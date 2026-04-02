import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  Button,
  Box,
  Chip,
  Divider
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function ReservationCard({ reservation }) {
  return (
    <Accordion
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        mb: 2,
        width:"95%",
        
        overflow: "hidden",
        "&:hover": { boxShadow: 5 },
      }}
    >
      {/* HEADER */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <Box>
            <Typography fontWeight="bold">{reservation.name}</Typography>

            <Box display="flex" gap={2} mt={0.5}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <EventIcon fontSize="small" />
                <Typography variant="body2">{reservation.date}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={0.5}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="body2">{reservation.time}</Typography>
              </Box>
            </Box>
          </Box>

          <Chip
            icon={<PeopleIcon />}
            label={reservation.partySize}
            color="primary"
            variant="outlined"
          />
        </Box>
      </AccordionSummary>

      <Divider />

      {/* DETAILS */}
      <AccordionDetails>
        <Box display="flex" flexDirection="column" gap={1.5}>
          
          <Box display="flex" alignItems="center" gap={1}>
            <PhoneIcon fontSize="small" />
            <Typography variant="body2">
              {reservation.phoneNumber}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <EmailIcon fontSize="small" />
            <Typography variant="body2">
              {reservation.email}
            </Typography>
          </Box>

          {reservation.specialRequests && (
            <Box>
              <Typography variant="subtitle2">Special Requests:</Typography>
              <Typography variant="body2" color="text.secondary">
                {reservation.specialRequests}
              </Typography>
            </Box>
          )}
        </Box>
      </AccordionDetails>

      {/* ACTIONS */}
      <AccordionActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<CancelOutlinedIcon />}
        >
          Cancel
        </Button>

      
      </AccordionActions>
    </Accordion>
  );
}
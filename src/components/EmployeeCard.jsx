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

export default function EmployeeCard({
  emp,
  handleEditeClickOpen,
  handleDeleteClickOpen,
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
            src={emp.faceImgUrl || ""}
            sx={{ bgcolor: red[500], fontWeight: "bold" }}
          >
            {!emp.faceImgUrl && emp.fullName?.[0]}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography fontWeight="bold" fontSize="1.1rem">
            {emp.fullName}
          </Typography>
        }
        subheader={
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {emp.startWorkAt} → {emp.endWorkAt}
            </Typography>
          </Box>
        }
      />

      <Divider />

      {/* Main Info */}
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip
            icon={<MonetizationOnIcon />}
            label={`${emp.dailySalery} DA / day`}
            color="success"
            variant="outlined"
          />

          <Typography variant="body2" color="text.secondary">
            ID: #{emp.id}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions disableSpacing>
        <IconButton
          color="primary"
          onClick={() => handleEditeClickOpen(emp.id, emp)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
          onClick={() => handleDeleteClickOpen(emp.id)}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      {/* Expand Section */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>
            Additional Details
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Full Name: {emp.fullName}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Working Hours: {emp.startWorkAt} - {emp.endWorkAt}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Daily Salary: {emp.dailySalery} DA
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}


import React, { useState } from "react";
import { Container, TextField, Button, Card, CardContent, Typography, Divider } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useAuth } from "../context/authContext";
export default function Settings() {
  // States
    const [showPassword, setShowPassword] = useState(false);
  const {admin}=useAuth()
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(true);
  const {theme}=useTheme();
  const handleProfileSave = () => {
    // call API to save profile changes
    console.log({ email, username });
  };

  const handlePasswordChange = async (newPassword,oldPassword,confirmPassword) => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }try{
    const res= await axios.put(`http://localhost:8080/admin/change-password`,{oldPassword,newPassword},
      {
        withCredentials:true,
         headers:{"Content-Type" :"application/json"}
      }
    )
    alert("password changed seccessfuly");
  }catch (err){
    console.error("change password error "+err);
  }
  
  };

  const handlePreferencesSave = () => {
    // call API to save preferences
    console.log({ notification });
  };

  return (
    <Container sx={{width:"95%",marginLeft:"5%"}} className="mt-8 mb-16">
      <Typography variant="h4" className={`mb-6 font-bold ${theme === "light"?"text-gray-800" : "text-grey-100"}`}>
        Settings
      </Typography>

      {/* Profile Section */}
      <Card className="mb-6 shadow-lg">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Profile Info
          </Typography>
       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
             disabled={true}
              label="Username"
              value={admin.fullname}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              disabled={true}
              value={admin.email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
        
        </CardContent>
      </Card>

      {/* Change Password Section */}
      <Card className="mb-6 shadow-lg">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Change Password
          </Typography>
       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div style={{display:'flex'}}>
                 <TextField
              label="old Password"
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setoldPassword(e.target.value)}
              fullWidth
       
              
            />
           
          </div>
         
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </div>
          <div className="flex justify-between mt-6 " >
            <Button variant="contained" color="secondary" onClick={(e)=>{
              e.preventDefault();
              handlePasswordChange(newPassword,oldPassword,confirmPassword);
              setConfirmPassword("");
              setNewPassword("");
              setoldPassword("");
            }}>
              Update Password
            </Button>
            <Button variant="outlined" color="secondary" onClick={(e)=>{
             setShowPassword(!showPassword)
            }}>
            {showPassword? "Hide Passwords":"Show Passwords"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Preferences
          </Typography>
       
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Typography>Enable Notifications</Typography>
            </div>
            <input
              type="checkbox"
              checked={notification}
              onChange={() => setNotification(!notification)}
              className="w-6 h-6"
            />
          </div>
        
        </CardContent>
      </Card>
    </Container>
  );
}

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
import { Divider, Switch } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

  // MUI Search
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 8,
    backgroundColor: theme === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.04),
    "&:hover": {
      backgroundColor: theme === "dark" ? alpha("#fff", 0.15) : alpha("#000", 0.08),
    },
    marginLeft: 0,
    width: "100%",
  }));

  const SearchIconWrapper = styled("div")(() => ({
    padding: "0 16px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme === "dark" ? "#e5e7eb" : "#6b7280",
  }));

  const StyledInputBase = styled(InputBase)(() => ({
    color: theme === "dark" ? "#f3f4f6" : "#111827",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: "8px 8px 8px 0",
      paddingLeft: `calc(1em + 32px)`,
      transition: "width 0.3s",
    },
  }));

  return (
    <header
      className={`fixed top-0 z-50 w-full backdrop-blur border-b transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-gray-100 to-gray-100 text-gray-700"
          : "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center gap-3 ${
              theme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}
          >
            <div
            
            >
             
            </div>
            <span className="text-xl font-bold tracking-tight">Taki Food</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[{id:1,lable:"Menu"}, {id:2,lable:"About"}, {id:3,lable:"Contact"}].map((item) => (
              <Link
                key={item.id}
                to={`/${item.lable.toLowerCase()}`}
                className={`relative transition-colors hover:text-red-600 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-700"
                }`}
              >
                {item.lable}
              </Link>
            ))}
          </nav>

      

          {/* Right Actions */}
          <div className="flex items-center gap-3">
                {/* Theme switch */}
                  <div className="hidden md:block ">
              <FormControlLabel  
        control={<MaterialUISwitch onChange={toggleTheme} sx={{ m: 1 }} checked={theme === "dark"} />}
        label=""
      />
      </div>
          

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className={`md:hidden rounded-lg p-2 transition ${
                theme === "dark"
                  ? "text-gray-100 hover:bg-gray-700 hover:text-red-400"
                  : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
              }`}
            >
              <MenuOutlinedIcon />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {["Menu",  "About", "Contact"].map((item) => (
             
               <Link
               key={item}
                to={`/${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-3 py-2 transition ${
                  theme === "dark"
                    ? "text-gray-100 hover:bg-gray-700 hover:text-red-400"
                    : "text-gray-700 hover:bg-gray-200 hover:text-red-600"
                }`}
              >
                {item}
              </Link>
             
             
             
            ))}
                  <FormControlLabel onClick={()=>{setIsMenuOpen(false)}} 
        control={<MaterialUISwitch onChange={toggleTheme} sx={{ m: 1 }} checked={theme === "dark"} />}
        label=""
      />
            {/* Mobile Search */}
          
          </nav>
        </div>
      </div>
    </header>
  );
}



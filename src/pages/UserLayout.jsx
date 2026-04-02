import { Route, Routes } from "react-router-dom";
import NavBar from "../components/Nav";
import Home from "./Home";
import CategoryList from "./CategoryList";
import ItemList from "./ItemList";
import { Outlet } from "react-router-dom";




export default function UserLaout(){

    return(
        <>
       <NavBar />
      <Outlet />
        </>
       
    )
}
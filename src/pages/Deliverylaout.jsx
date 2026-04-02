import { Outlet } from "react-router-dom";
import DeliverySidebar from "../components/DeliverySidebar";

export default function Deliverylayout(){

        return(
 <>

        <DeliverySidebar />
      <Outlet/>
        </>
    )
}
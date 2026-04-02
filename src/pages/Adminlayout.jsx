
import DashboardSideBar from "../components/DashbordSideBAr"
import { Outlet} from "react-router-dom"


export default function AdminLayout(){
    
    return(
 <>

        <DashboardSideBar />
      <Outlet />
        </>
    )
}
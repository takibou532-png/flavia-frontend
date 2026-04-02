
import AdminLayout from './pages/Adminlayout'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'

import './App.css'
import Login from './pages/Login'
import ProtectedRoutes from './auth/ProtectedRoutes'
import { ThemeProvider } from './context/ThemeContext'
import UserLaout from './pages/UserLayout'
import CategoryList from './pages/CategoryList'
import ItemList from './pages/ItemList'
import CategoryService from "./DashBoardPages/CategoryService";
import ItemService from "./DashBoardPages/ItemService"
import Dashboard from './pages/Dashboard'
import Settings from './DashBoardPages/Settings'
import About from './pages/about'
import Contact from './pages/Contact'

import OrderService from './DashBoardPages/OrderService'
import DeliverySidebar from './components/DeliverySidebar'
import Deliverylayout from './pages/Deliverylaout'
import ReservationService from './DashBoardPages/ReservationService'
import EmployeeService from './DashBoardPages/EmployeeService'
import DeliveryOrder from './DashBoardPages/DeliveryOrder'

function App() {


  return (
<ThemeProvider>
  <Routes>

    {/* USER ROUTES */}
    <Route element={<UserLaout />}>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/menu" element={<ItemList />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Route>

    {/* LOGIN */}
    <Route path="/login" element={<Login />} />

    {/* ADMIN ROUTES */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoutes role="ADMIN">
          <AdminLayout />
        
        </ProtectedRoutes>
      }
    >
  
      <Route path="categories" element={<CategoryService />} />
       <Route index element={<Dashboard />} />
      <Route path="menu" element={<ItemService />} />
      <Route path="orders" element={<OrderService />} />
      <Route path="reservations" element={<ReservationService />} />
      <Route path="Employees" element={<EmployeeService/>} />
      <Route path="settings" element={<Settings />} />
      
    </Route>
    <Route
      path="/Delivery-Dashboard"
      element={
        <ProtectedRoutes role="DELEVERY">
        <Deliverylayout/>
        
        </ProtectedRoutes>
      }
    >
  
 <Route index element={<DeliveryOrder />} />
<Route path="orders" element={<DeliveryOrder />} />
     <Route path="settings" element={<Settings />} />
    </Route>

      <Route path='*' element={<h1>not found 404</h1>}/>
  </Routes>
</ThemeProvider>
  )
}

export default App

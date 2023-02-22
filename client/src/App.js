import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/layout/Home/Home';
import Navbar from './components/layout/Header/Navbar';
import './App.css'
import LoginSignup from './components/User/LoginSignup';
import store from "./store"
import { loardUser } from './actions/userAction';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProctedRout from './components/ProctedRout/ProctedRout';
import Loader from './components/layout/loading/Loader';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import RestetPass from './components/User/RestetPass';
import MyOrders from './components/order/MyOrders';
import Dashboard from './components/admin/Dashboard';
import UsersList from './components/admin/UsersList';
import UpdateUserRole from './components/admin/UpdateUserRole';
import Footer from './components/layout/Footer/Footer';
import About from './components/layout/About/About';
import Contact from './components/layout/Contact/Contact';
import UserOptions from './components/layout/Header/UserOptions';
import CreateEvent from './components/layout/Create/CreateEvent';
import EventList from './components/admin/EventList';
import EditEvent from './components/admin/EditEvent';
import Search from './components/Products/Search';

function App() {

  const {loading,isAuthenticated,user}=useSelector(state=>state.user);
  const {events,error}=useSelector(state=>state.events);

  useEffect(()=>{
    if (user !==null) {
    store.dispatch(loardUser())
      
    }
  },[])
  return (
    <>
    {loading?<Loader/>:(
    <>
    <BrowserRouter>
    <Navbar/>
    {isAuthenticated&&<UserOptions user={user}/>}
    <Routes>
    <Route element={<ProctedRout isAunthenticated={isAuthenticated}/>}>



<Route path='/account' element={<Profile/>}/>
 <Route path='/me/update' element={<UpdateProfile/> }/>
<Route path='/password/update' element={<UpdatePassword/>}/>
<Route path='/create' element={<CreateEvent/>} />
<Route path='/MY-Events'element={<MyOrders/>}></Route>
<Route path='/search' element={<Search/>}></Route>
<Route path='/:name' element={<Home/>} />




</Route>
<Route element={<ProctedRout isAdmin={true} isAunthenticated={isAuthenticated}/>}>
<Route path='/admin/dashboard'element={<Dashboard/>}></Route>

<Route path='/admin/users'element={<UsersList/>}></Route>
<Route path='/admin/events' element={<EventList/>}></Route>


<Route path='/admin/event/:id'element={<EditEvent/>}></Route>
<Route path='/admin/user/:id'element={<UpdateUserRole/>}></Route>

</Route> 
<Route path='/' element={<Home/>} />

      <Route path='/login' element={ <LoginSignup/> }/>
      <Route path='/password/forgot' element={ <ForgotPassword/> }/>
      <Route path='/password/reset/:token' element={ <RestetPass/> } />
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/about' element={<About/>}></Route> 
    </Routes>
    <Footer/>
    </BrowserRouter>
    
    </>
    )}
  </>
  );
}

export default App;


import './App.css';

import Addcourt from './Pages/AddCourt';
import Home from './Pages/Home';
import Login from './Pages/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CourtUserPage from './Pages/CourtUserPage';
import Mybookings from './Pages/Mybookings';
import { AdminAuth, LoginAuth, UserAuth } from './authorization/Authorization';
import { Toastcontainer } from './Components/Commen/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
  <Toastcontainer/>
  <BrowserRouter>
  <Routes>
    <Route element = {<LoginAuth/>}>
    <Route path='/' element={<Login/>}/>
    </Route>
    <Route element={<UserAuth/>}>
    <Route path='/home' element={<Home/>}/>
    <Route path='/courtUserPage/:id' element={<CourtUserPage/>}/>
    <Route path='/mybookings' element={<Mybookings/>}/>
    </Route>
    <Route element={<AdminAuth/>}>
    <Route path='/addNewcourt' element={<Addcourt/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;

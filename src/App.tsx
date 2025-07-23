
//@ts-nocheck
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./screens/dashboard";
import { LocalStorage } from "./util/localStorage";
import Login from "./screens/login";


const isAuthenticated = () => {
  return !!LocalStorage.get("token"); 
};


const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

function App() {
 

  

  return (
    <Routes>

      <Route path="/login" element={<Login />} />

  
      <Route path="/" element={<PrivateRoute element={<Dashboard/>}/>} />
   
      
    </Routes>
  );
}

export default App;

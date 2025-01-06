// import React from "react";
// import Widgets from "./Widgets/Widgets";
// import Sidebar from "./Sidebar/Sidebar";
// import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useUserAuth } from "../context/UserAuthContext";
// const Home = () => {
//   const [logout,user]=useUserAuth()
//   const navigate = useNavigate();
  // const user={
  //   displayname:"bithead",
  //   email:"bithead@gamil.com"
  // }
//   const handlelogout = async () => {
//     try {
//       await logout()
//       navigate("/login");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <div className="app">
//       <Sidebar handlelogout={handlelogout} user={user}/>
//       <Outlet/>
//       <Widgets/>
//     </div>
//   );
// };
// export default Home;
import React from "react";
import Widgets from "./Widgets/Widgets";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
 
  const { logout, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Logout Error:", error.message);
    }
  };

  return (
    <div className="app">
      <Sidebar handleLogout={handleLogout} user={user} />
      <Outlet />
      <Widgets />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";

const useLoggedinuser = () => {
  const { user } = useUserAuth();
  const email = user?.email;  
  const [loggedinuser, setLoggedinUser] = useState(null);  

  useEffect(() => {
    if (!email) return; 
    fetch(`http://localhost:5000/loggedinuser?email=${email}`)
      .then((res) => {
        if (!res.ok) {
          
          throw new Error(`Failed to fetch user: ${res.statusText}`);
        }
        return res.json();  // Parse the JSON response
      })
      .then((data) => {
        console.log(data);  
        setLoggedinUser(data);  
      })
      .catch((error) => {
        console.error("Error fetching logged-in user:", error.message);  // Handle error
      });
  }, [email]); 

  return [loggedinuser, setLoggedinUser];  
};

export default useLoggedinuser;

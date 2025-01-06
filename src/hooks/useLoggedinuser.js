import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";

const useLoggedinuser = () => {
  const { user } = useUserAuth();
  const email = user?.email;
  const [loggedinuser, setloggedinuser] = useState(null); 

  useEffect(() => {
    if (!email) return; 

    fetch(`http://localhost:5000/loggedinuser?email=${email}`) // Use template literal
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setloggedinuser(data);
      })
      .catch((error) => {
        console.error("Error fetching logged-in user:", error.message);
      });
  }, [email]);

  return [loggedinuser, setloggedinuser]; 
};

export default useLoggedinuser;

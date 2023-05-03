import { User } from "../models/User";
import "./Components.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../services/userService";
import { getUserLogged } from "../extra/methods";

export function Navbar(): JSX.Element {
  const [userLogged,setUserLogged] = useState<User>();
  const service:UserService = new UserService();
  
  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUserLogged(undefined);
  }

  useEffect(() => {
    const user:User|null = getUserLogged();
    if(user){
      //check for the validation of the token
      service.checkTokenValidation(user)
        .then((valid:boolean) => {
          if(valid)
            setUserLogged(user)
        })
    }
  },[])

  return (
    <div className="navbar">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#gallery">Car Gallery</a>
      <a href="#rent">Rent</a>
      <a href="#contact">Contact</a>
      <div>
        {userLogged 
        ? <div className="user-info">
                <h5>hi, {userLogged.firstname}</h5>
                <button onClick={handleLogOut}>log out</button>
                <Link to="/me">
                    <button>my rents</button>
                </Link>
        </div>
        : <Link to="/authenticate">
            <button>log in or sign up</button>
        </Link>
        }
      </div>
    </div>
  );
}

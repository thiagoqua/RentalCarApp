import { Col, Row } from "react-bootstrap";
import { User } from "../models/User";
import "./Components.css";
import { useEffect, useState } from "react";
import { Authenticate } from "./Authenticate";
import { Link } from "react-router-dom";

export function Navbar(): JSX.Element {
  const [userLogged,setUserLogged] = useState<User>();
  
  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUserLogged(undefined);
  }

  const handleLogIn = () => {

  }

  useEffect(() => {
    const userString: string | null = localStorage.getItem("user");
    if(userString != null)
        setUserLogged((JSON.parse(userString) as User))
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
        ? <Row>
            <Col>
                <h5>hi, {userLogged.firstname}</h5>
            </Col>
            <Col>
                <button onClick={handleLogOut}>log out</button>
            </Col>
            <Col>
                <Link to="/me">
                    <button>my rents</button>
                </Link>
            </Col>
        </Row>
        : <Link to="/authenticate">
            <button>log in or sign up</button>
        </Link>
        }
      </div>
    </div>
  );
}

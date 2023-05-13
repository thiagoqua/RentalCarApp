import "./Components.css";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export function Navbar(): JSX.Element {
  const {userLogged,logout} = useUser();

  const handleLogOut = () => {
    logout();
  }

  return (
    <div className="navbar">
      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#gallery">Car Gallery</a>
        <a href="#rent">Rent</a>
        <a href="#contact">Contact</a>
      </div>
      {userLogged 
      ? <div className="user-info">
          <div className="flexdiv">
            <span style={{fontSize:'1.5rem'}}>hi, </span><span className="attr"> {userLogged.firstname}</span>
          </div>
          <button onClick={handleLogOut} className="animated-button-def">log out</button>
          <Link to="/me">
              <button className="animated-button-def">my rents</button>
          </Link>
        </div>
      : <Link to="/authenticate">
          <button className="animated-button-def">Log In or Sign Up</button>
        </Link>
      }
    </div>
  );
}

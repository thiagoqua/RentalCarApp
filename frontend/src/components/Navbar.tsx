import "./Components.css";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

interface Props{
  inAdminPage?:boolean;
  changeViewForAdmins?:(home?:boolean) => void;
}

export function Navbar({changeViewForAdmins,inAdminPage}:Props): JSX.Element {
  const {userLogged,logout} = useUser();
  const isAdmin:boolean = userLogged && userLogged.role === 'ADMIN';
  const buttonMessage:string = inAdminPage ? 'Home' : 'Admin';
  const linksClassname = inAdminPage ? 'hidden' : 'navbar-links';

  const handleLogOut = () => {
    if(inAdminPage)
      changeViewForAdmins!();
    logout();
  }

  return (
    <div className="navbar">
      <div className={linksClassname}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#gallery">Car Gallery</a>
        <a href="#rent">Rent</a>
        <a href="#contact">Contact</a>
      </div>
      {userLogged 
      ? <div className={isAdmin ? 'user-info-shorted' : 'user-info'}>
          <div className="flexdiv">
            <span style={{fontSize:'1.5rem'}}>hi, </span><span className="attr"> {userLogged.firstname}</span>
          </div>
          <button onClick={handleLogOut} className="animated-button-def">log out</button>
          <Link to="/me">
              <button className="animated-button-def">my rents</button>
          </Link>
          {isAdmin && 
            <button className="animated-button-def" 
                    onClick={() => changeViewForAdmins!()}>
              {buttonMessage}
            </button>
          }
        </div>
      : <Link to="/authenticate">
          <button className="animated-button-def">Log In or Sign Up</button>
        </Link>
      }
    </div>
  );
}

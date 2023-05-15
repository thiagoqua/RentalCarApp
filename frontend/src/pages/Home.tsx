import { About } from "../components/About";
import { Navbar } from "../components/Navbar";
import { RentVehicles } from "../components/RentVehicles/RentVehicles";
import './styles.css';
import { Contact } from "../components/Contact";
import welcome_photo from '../assets/welcome-photo.png'
import { CarGallery } from '../components/CarGallery'
import { AdminHome } from "./AdminHome";
import { useUser } from "../hooks/useUser";
import { useState } from "react";

export function Home(): JSX.Element {
  const {userLogged} = useUser();
  //true if the user is in the admin pages
  const [goAdmin,setGoAdmin] = useState<boolean>(userLogged && userLogged.role === 'ADMIN');

  const handleChangeView = () => {
    setGoAdmin(!goAdmin);
  }

  return (
    <>
      <Navbar changeViewForAdmins={handleChangeView} inAdminPage={goAdmin}/>
      {goAdmin
      ? <AdminHome/>
      :
        <>
          <div>
            <h1>Welcome to RoW Car Rental</h1>
            <div className="home-section">
              <div className="col-lg-6 w-paragraph">
                <p className="lead">
                  We offer a wide range of high-quality rental cars to suit your
                  needs and budget. Whether you're here for business or pleasure,
                  we've got you covered. Our friendly and professional staff are
                  ready to help you find the perfect car for your trip, so you can
                  sit back, relax, and enjoy the ride.{" "}
                </p>
              </div>
              <div className="col-lg-6 porta-w-photo">
                <img src={welcome_photo}
                    alt="aestetic-photo"
                    className="welcome-photo"
                    />
              </div>
            </div>
          </div>
          <CarGallery />
          <About />
          <RentVehicles />
          <Contact/>
        </>  
      }
    </>
  );
}

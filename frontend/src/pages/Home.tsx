import { About } from "../components/About";
import { Navbar } from "../components/Navbar";
import { RentVehicles } from "../components/RentVehicles/RentVehicles";
import { CarGallery } from "../components/CarGallery";
import './styles.css';
import { Contact } from "../components/Contact";
import welcome_photo from '../assets/welcome-photo.png'
import { CarGallery2 } from "../components/CarGallery2";

export function Home(): JSX.Element {
  return (
    <>
      <Navbar />
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
      <CarGallery2 />
      <About />
      <RentVehicles />
      <Contact/>
    </>
  );
}

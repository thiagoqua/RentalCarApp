import { VehicleInfoExtended } from "./VehicleInfoExtended";
import { useCars } from "../hooks/useCars";
import { Car } from "../models/Car";
import { useState } from "react";

export function CarGallery():JSX.Element{
  const {vehicles} = useCars({});
  const [index,setIndex] = useState<number>(0);
  const actual:Car = vehicles[index];

  const handleCar = (next:boolean) => {
    let newIndex:number = index;
    next ? newIndex++ : newIndex--;

    if(newIndex < 0)
      newIndex = vehicles.length - 1;
    else if(newIndex == vehicles.length)
      newIndex = 0;
    
    setIndex(newIndex);
  };

  return(
    <div>
      <h1>Our cars</h1>
      <div className="container gallery" id="gallery">
        <div className="row">
          <div className="col-lg-9 col-sm-12 ">
            <div className="flexdiv">
              <span className="car-brand">{actual?.brand}</span>
              <span className="car-model">{actual?.model}</span>
            </div>
            <div className="porta-photo">
              <img
                    src={actual?.imageURL}
                    alt="car_image"
                    className="vm-car-photo"
              />
            </div>
            <div className="flexdiv">
              <button className="next-car-button" onClick={() => {handleCar(false)}}>
                <span>Previous vehicle</span>
                <svg style={{rotate:'180deg'}} width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="37" cy="37" r="35.5" stroke="black" strokeWidth="3"></circle>
                    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                </svg>
              </button>
              <button className="next-car-button" onClick={() => {handleCar(true)}}>
                <span>Next vehicle</span>
                <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="37" cy="37" r="35.5" stroke="black" strokeWidth="3"></circle>
                    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="col-lg-3 col-sm-12">
            {actual && <VehicleInfoExtended vehicle={actual}/>}
          </div>
        </div>
      </div>
    </div>
  )
}
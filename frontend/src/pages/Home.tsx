import { About } from "../components/About";
import { Navbar } from "../components/Navbar";
import { RentVehicles } from "../components/RentVehicles";
import { VehicleModels } from "../components/VehicleModels";

export function Home():JSX.Element{
    return (
        <>
            {/* <Navbar/> */}
            <About/>
            <VehicleModels/>
            <RentVehicles/>
        </>
    )
}
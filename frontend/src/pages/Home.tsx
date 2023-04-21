import { About } from "../components/About";
import { Navbar } from "../components/Navbar";
import { RentVehicles } from "../components/RentVehicles";
import { CarGallery } from "../components/CarGallery"

export function Home():JSX.Element{
    return (
        <>
            {/* <Navbar/> */}
            <About/>
            <CarGallery/>
            <RentVehicles/>
        </>
    )
}
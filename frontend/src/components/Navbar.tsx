import './Components.css'

export function Navbar():JSX.Element{
    return (
        <div className="navbar">
            <a href='#home'>Home</a>
            <a href='#about'>About</a>
            <a href='#gallery'>Car Gallery</a>
            <a href='#rent'>Rent</a>
            <a href='#contact'>Contact</a>
        </div>
    )
}
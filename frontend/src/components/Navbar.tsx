import './Navbar.css'

export function Navbar():JSX.Element{
    return (
        <div className="navbar">
            <a>Home</a>
            <a>About</a>
            <a>Vehicle Models</a>
            <a>Rent</a>
            <a>Contact</a>
        </div>
    )
}
import './Components.css'

export function Contact():JSX.Element{
  return (
    <div className="container" id="contact">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 c-info">
          <h3>RoW contact</h3>
            <span>0341-1234567</span>
            <br/>
            <span>cityros@onwheels.car.ar</span>
            <br/>
            <span>0341-8912345</span>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 c-info">
          <h3>Working hours</h3>
          <b>Mon - Fri</b><span> 08:00 to 20:00</span>
          <br/>
          <b>Sat</b><span> 08:00 to 12:00</span>
          <br/>
          <b>Sun</b><span> closed</span>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 c-info">
          <h3>Social media</h3>
          <div className='links'>
            <a href='https://instagram.com/rosario-on-wheels'>
              <img  src='https://cdn-icons-png.flaticon.com/128/174/174855.png' alt='ig-logo' 
                    className='social-logo'/>
            </a>
            <a href='https://facebook.com/rosario-on-wheels'>
              <img  src='https://cdn-icons-png.flaticon.com/128/174/174848.png' alt='fb-logo' 
                    className='social-logo'/>
            </a>
            <a href='https://linkedin.com/rosario-on-wheels'>
              <img  src='https://cdn-icons-png.flaticon.com/128/3536/3536505.png' alt='ln-logo' 
                    className='social-logo'/>
            </a>
          </div>
          <br/>
        </div>
      </div>
    </div>
  )
}
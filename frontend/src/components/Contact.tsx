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
          <span>https://instagram.com/rosario-on-wheels</span>
          <br/>
          <span>https://facebook.com/rosario-on-wheels</span>
          <br/>
          <span>https://linkedin.com/rosario-on-wheels</span>
        </div>
      </div>
    </div>
  )
}
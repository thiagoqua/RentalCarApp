import { Col } from "react-bootstrap";
import { CATEGORIES } from "../../helpers/constants";
import { useDates } from "../../hooks/useDates";

interface myProps {
  handleCars: (from:any,to:any,category?:string) => void;
}

export function SeletData({ handleCars }:myProps): JSX.Element {
  const {setFirstDate,setSecondDate,dateIn,dateOut,datesCompleted,reset} = useDates();

  const handleDates = (isFirstDate:boolean) => {
    if(isFirstDate)
      setFirstDate();
    else{
      setSecondDate();
      setTimeout(() => {
        handleCars(dateIn,dateOut);
      },500);
    }
  }

  const resetDates = () => {
    reset();
  }

  return (
    <div>
      {datesCompleted && <button className="animated-button-def" onClick={resetDates}>reset dates</button>}
      <Col lg={12} className="rv-section">
        <div className="rv-section-data">
          <span>Drop in date</span>
          <input
            type="date"
            id="dropInDate"
            onChange={() => {
              handleDates(true);
            }}
            min={new Date().toJSON().slice(0, 10)}
            className="selection"
            disabled={datesCompleted}
          />
        </div>
        <div className="rv-section-data">
          <span>Drop off date</span>
          <input
            type="date"
            id="dropOffDate"
            onChange={() => handleDates(false)}
            min={dateOut?.toJSON().slice(0, 10)}
            disabled={dateIn ? false : true}
            className="selection"
          />
        </div>
      </Col>
      <div className="rv-select-car">
        <h4>Filters (optional)</h4>
        <div className="rv-section">
          <div className="rv-section-data">
            <span>Car Type</span>
            <select disabled={!datesCompleted} className="selection">
              {CATEGORIES.map((category) => (
                <option onClick={() => handleCars(dateIn,dateOut,category)} key={category} id="op">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Col } from "react-bootstrap";
import { CATEGORIES } from "../../helpers/constants";
import { useDates } from "../../hooks/useDates";

interface myProps {
  handleCars: (from:Date,to:Date) => void;
  handleFilter: (category:string) => void;
  handleReset:() => void;
}

export function SeletData({handleCars,handleFilter,handleReset}:myProps): JSX.Element {
  const {setFirstDate,setSecondDate,dateIn,dateOut,datesCompleted,reset} = useDates();
  const minDateIn:Date = new Date();

  if(minDateIn.getHours() > 7)
    minDateIn.setDate(minDateIn.getDate() + 1);

  const handleDates = (isFirstDate:boolean,value:string) => {
    const valueAsDate:Date = new Date(value.split('-').join('/'));

    if(isFirstDate)
      setFirstDate(valueAsDate);
    else{
      setSecondDate(valueAsDate);
      handleCars(dateIn,valueAsDate);
    }
  }

  const resetDates = () => {
    handleReset();
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
            onChange={(event) => handleDates(true,event.target.value)}
            min={minDateIn.toJSON().slice(0,10)}
            className="selection"
            disabled={datesCompleted}
          />
        </div>
        <div className="rv-section-data">
          <span>Drop off date</span>
          <input
            type="date"
            id="dropOffDate"
            onChange={(event) => handleDates(false,event.target.value)}
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
                <option onClick={() => handleFilter(category)} key={category} id="op">
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

import { Col } from "react-bootstrap";
import { CATEGORIES } from "../../extra/constants";

interface myProps {
  handleDates: (inDate:boolean) => void;
  handleCategory: (which:string) => void;
  inDate?: Date;
  datesCompleted:boolean;
}

export function SeletData({ handleDates,handleCategory,inDate,datesCompleted }:myProps): JSX.Element {
  const outDate:Date = new Date();
  
  if(inDate)
    outDate.setDate(inDate.getDate() + 2)

  return (
    <div>
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
          />
        </div>
        <div className="rv-section-data">
          <span>Drop off date</span>
          <input
            type="date"
            id="dropOffDate"
            onChange={() => handleDates(false)}
            min={outDate.toJSON().slice(0, 10)}
            disabled={inDate ? false : true}
            className="selection"
          />
        </div>
      </Col>
      <div className="rv-select-car">
        <h4>Filters (optional)</h4>
        <Col className="rv-section">
          <div className="rv-section-data">
            <span>Car Type</span>
            <select disabled={!datesCompleted} className="selection">
              {CATEGORIES.map((category) => (
                <option onClick={() =>handleCategory(category)} key={category} id="op">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </Col>
      </div>
    </div>
  );
}

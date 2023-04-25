import { Col } from "react-bootstrap";
import { CATEGORIES } from "../../constants";

interface myProps {
  handleDates: (inDate:boolean) => void;
  handleCategory: (which:string) => void;
  inDate?: string;
  datesCompleted:boolean;
}

export function SeletData({ handleDates,handleCategory,inDate,datesCompleted }:myProps): JSX.Element {
  return (
    <div>
      <Col lg={12} className="rv-section">
        <div className="rv-section-data">
          <span>drop in date</span>
          <input
            type="date"
            id="dropInDate"
            onChange={() => {
              handleDates(true);
            }}
            min={new Date().toJSON().slice(0, 10)}
          />
        </div>
        <div className="rv-section-data">
          <span>drop off date</span>
          <input
            type="date"
            id="dropOffDate"
            onChange={() => handleDates(false)}
            min={inDate}
          />
        </div>
      </Col>
      <div className="rv-select-car">
        <h4>Filters (optional)</h4>
        <Col className="rv-section">
          <div className="rv-section-data">
            <span>car type</span>
            <select disabled={!datesCompleted}>
              {CATEGORIES.map((category) => (
                <option onClick={() =>handleCategory(category)} key={category}>
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

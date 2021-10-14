import { Button } from "react-bootstrap";

const CardView = ({ rock, click, setClick, data }) => {
  return (
    <div className="view" 
    style={{display: `${isNaN(click) ? "none" : "flex"}`}}>
      <Button className="bg-danger" onClick={() => setClick(NaN)} > Close </Button>
      <div className="card-component">
        <div className="card-img">
          <img alt="Rock-img" src={rock} width="400" className="" />
        </div>
        <div className="card-text">
          <p>
            <strong>Name: </strong>{isNaN(click) ? '' : data[click].name}
          </p>
          <p>
            <strong>Artist: </strong>Linkin Park
          </p>
          <p>
            <strong>Album: </strong>Hybrid Theory
          </p>
          <p>
            <strong>Genre: </strong>Rock
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardView;

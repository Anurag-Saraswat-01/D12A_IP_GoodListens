import { Card } from "react-bootstrap";
import { useState } from "react";
import CardView from "./CardView";

const Table = ({ rock, dataArr }) => {

  const [click, setClick] = useState(NaN);
  const card = dataArr.map((data, key) => {
    // console.log((isNaN(click)))
    // console.log(data.id)
    return (
      <div className="col-md-3" key={key}>
        <Card onClick={() => setClick(key)} >
          <Card.Img variant="top" src={data.image} />
          <Card.Body className="bg-dark">
            <Card.Title className="center">{data.name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  });


  return (
    <div className="container-fluid bodyContainer">
      <div className="tableContainer">
        <div className="row">{card}</div>
      </div>
      <div className="parent">
        <CardView rock={rock} click={click} setClick={setClick} data={dataArr} />
      </div>
    </div>
  );
};

export default Table;

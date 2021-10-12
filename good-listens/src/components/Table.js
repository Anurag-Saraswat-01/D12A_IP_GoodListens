import { Card } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardView from "./CardView";

const Table = ({ rock }) => {

  const [click, setClick] = useState(false);
  const arr = [
    {
      name: "In The End",
    },
    {
      name: "Life Goes on",
    },
    {
      name: "Numb",
    },
    {
      name: "Industry Baby",
    },
    {
      name: "Animals",
    },
  ];


  const card = arr.map((data) => {
    return (
      <div className="col-md-3">
        <Card>
          <Card.Img variant="top" src={rock} />
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
      <CardView rock ={rock}/>
    </div>
  );
};

export default Table;

import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Table = ({ rock }) => {
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
        }
    ];

    const card = arr.map((data) => {
        return <div className="col-md-3">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={rock} />
          <Card.Body  className="bg-dark">
            <Card.Title className="center">{data.name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    });

  return (
    <div className="container-fluid">
      <div className="row">
        {card}
{/* 
        <div className="col-md-3">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={rock} />
            <Card.Body  className="bg-dark">
              <Card.Title className="center">In The End</Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={rock} />
            <Card.Body  className="bg-dark">
              <Card.Title className="center">In The End</Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={rock} />
            <Card.Body  className="bg-dark">
              <Card.Title className="center">In The End</Card.Title>
            </Card.Body>
          </Card>
        </div> */}

      </div>
    </div>
  );
};

export default Table;

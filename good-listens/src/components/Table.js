import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import CardView from "./CardView";

const Table = ({ rock, dataArr }) => {

  const [click, setClick] = useState(NaN);
  const [pageData, setPageData] = useState([])
  const [pageNum, setPageNum] = useState(1)

  const max_pages = (dataArr.length % 12 === 0) ? dataArr.length / 12 : Math.round(dataArr.length / 12) + 1

  const prevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1)
    } else {
      setPageNum(max_pages)
    }
  }

  const nextPage = () => {
    if (pageNum < max_pages) {
      setPageNum(pageNum + 1)
    } else {
      setPageNum(1)
    }
  }

  const card = pageData.map((data, key) => {
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

  // updating the pageData as per pageNum
  useEffect(() => {
    setPageData(dataArr.slice((pageNum - 1) * 12, ((pageNum - 1) * 12) + 12 ))
  }, [pageNum, dataArr])

  return (
    <div className="container-fluid bodyContainer">
      <div className="tableContainer">
        <div className='pageBtnContainer'>
          <div className='pageBtn' onClick={prevPage} >< FaAngleLeft size={30} color={"orange"} /></div>
          <h4>{pageNum}</h4>
          <div className='pageBtn' onClick={nextPage} >< FaAngleRight size={30} color={"orange"} /></div>
        </div>
        <div className="row">{card}</div>
      </div>
      <CardView rock={rock} click={click} setClick={setClick} data={pageData} />
    </div>
  );
};

export default Table;

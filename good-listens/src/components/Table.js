import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import CardView from "./CardView";

const Table = ({ rock, dataArr, lang, filteredData }) => {

  const [click, setClick] = useState(NaN);
  const [pageData, setPageData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  //Filtering the data to be shown according to languages
  // const filteredData = dataArr.filter(data => data.language === lang )

  //Calculating the maximum number of pages
  const max_pages = (filteredData.length % 12 === 0) ? filteredData.length / 12 : Math.round(filteredData.length / 12) + 1

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
    setPageData(filteredData.slice((pageNum - 1) * 12, ((pageNum - 1) * 12) + 12 ))
  }, [pageNum, filteredData])
  // , filteredData
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
      <div className="parent">
        <CardView rock={rock} click={click} setClick={setClick} data={pageData} />
      </div>
    </div>
  );
};

export default Table;

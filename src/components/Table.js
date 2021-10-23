import CardView from "./CardView";
import { useState, useEffect } from "react";
import { ref, set } from "firebase/database";
import { database } from './Firebase';
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"



const Table = ({ dataArr, searchTerm, filteredData, setSortBy, setlang, searchResults, updateRating, user }) => {

  const [click, setClick] = useState(NaN);
  const [pageData, setPageData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [search, setSearch] = useState(false)
  
  let dataID = []
  for (let i = 0; i < dataArr.length; i++) {
    dataID.push(dataArr[i].id);
  }
  //Filtering the data to be shown according to languages

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

  const insertData = async (track) => {
    const db = database.getDatabase()
    set(ref(db, "spotify/" + track.id), {
      album: track.album,
      image: track.image,
      artist: track.artist,
      release_date: track.release_date,
      album_type: track.album_type,
      name: track.name,
      language: "undefined",
      url: track.url,
      user_rating: {}
    });
    console.log("Data added successfully");
  }


  //if there is something in the searchbox will set the search hook to true 
  useEffect(() => {
    if (searchTerm === "" && searchTerm.length === 0) {
      setSearch(false);
    }
    else if (searchTerm.length > 0) {
      setSearch(true)
    }
  }, [searchTerm])

  const handleClick = (data, key) => {
    setClick(key)
    if (dataID.includes(data.id)) {
      console.log("Data is already in Database");
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].id === data.id) {
          data.user_rating = dataArr[i].user_rating
        }
      }
    }
    else {
      console.log("Data not in database");
      insertData(data)
    }
  }
  
  //card and searchCard are same but they are mapping pagedata and searchresults 
  const card = pageData.map((data, key) => {
    return (
      <div className="col-lg-3 col-md-6 col-sm-12" key={key}>
        <Card onClick={() => { setClick(key) }} >
          <Card.Img variant="top" src={data.image} />
          <Card.Body className="bg-dark card-body">
            <Card.Title className="center card-tile">{data.name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  });

  const searchCard = searchResults.map((data, key) => {
    return (
      <div className="col-lg-3 col-md-6 col-sm-12" key={key}>
        <Card onClick={() => handleClick(data, key)} >
          <Card.Img variant="top" src={data.image} />
          <Card.Body className="bg-dark card-body">
            <Card.Title className="center card-title">{data.name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  });

  const handleFilter = (lang) => {
    setPageNum(1)
    setlang(lang)
  }

  const handleSortBy = (sortBy) => {
    setPageNum(1)
    setSortBy(sortBy)
  }

  // updating the pageData as per pageNum
  useEffect(() => {
    setPageData(filteredData.slice((pageNum - 1) * 12, ((pageNum - 1) * 12) + 12))
  }, [pageNum, filteredData])

  return (
    <div className="container-fluid bodyContainer">
      <div className="tableContainer">
        <div className='pageBtnContainer'>
          <div className='pageBtn' onClick={prevPage} >< FaAngleLeft size={30} color={"orange"} className="pageBtnIcon" /></div>
          <DropdownButton id="dropdown-basic-button" align="end" title="Language">
            <Dropdown.Item className="languageDropdown" onClick={() => handleFilter("English")}>English</Dropdown.Item>
            <Dropdown.Item className="languageDropdown" onClick={() => handleFilter("Hindi")}>Hindi</Dropdown.Item>
          </DropdownButton>
          <div className="pageNumber" >{pageNum}</div>
          <DropdownButton id="dropdown-basic-button" align="end" title="Sort By">
            <Dropdown.Item className="languageDropdown" onClick={() => handleSortBy("name")} >Name</Dropdown.Item>
            <Dropdown.Item className="languageDropdown" onClick={() => handleSortBy("artist")} >Artist</Dropdown.Item>
            {user ? <Dropdown.Item className="languageDropdown" onClick={() => handleSortBy("user")} >Your Rating</Dropdown.Item> : null}
            <Dropdown.Item className="languageDropdown" onClick={() => handleSortBy("average")} >Top Rating</Dropdown.Item>
          </DropdownButton>
          <div className='pageBtn' onClick={nextPage} >< FaAngleRight size={30} color={"orange"} className="pageBtnIcon" /></div>
        </div>
        <div className="row" >{search ? searchCard : card}</div>
      </div>
      <div className="parent">
        <CardView click={click} setClick={setClick} data={search ? searchResults[click] : pageData[click]}
          dataArr={dataArr} updateRating={updateRating} user={user} />
      </div>
    </div>
  );
};

export default Table;

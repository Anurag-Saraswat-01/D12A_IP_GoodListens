import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import CardView from "./CardView";
import { ref, set } from "firebase/database";
import { auth, provider, getAuth, database } from './Firebase';


const Table = ({ dataArr, searchTerm, lang, filteredData, setSortBy, setlang, searchResults, updateRating, user }) => {

  var dataID = []
  for (let i = 0; i<dataArr.length; i++) {
    dataID.push(dataArr[i].id);
  }
  const [click, setClick] = useState(NaN);
  const [pageData, setPageData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [search, setSearch] = useState(false)
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

  const insertData = async(track) => {
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
      // user_rating: ('user_rating' in songs[song] ? songs[song].user_rating : null)
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
  const handleClick = (data,key) => {
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
  // console.log(click);
  //card and searchCard are same but they are mapping pagedata and searchresults 
  const card = pageData.map((data, key) => {
    return (
      <div className="col-md-3" key={key}>
        {/* handleClick(key, data) */}
        <Card onClick={() => {setClick(key)} } >
          <Card.Img variant="top" src={data.image} />
          <Card.Body className="bg-dark">
            <Card.Title className="center">{data.name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  });

  const searchCard = searchResults.map((data, key) => {
    // console.log(searchResults);
    return (
      <div className="col-md-3" key={key}>
        <Card onClick={() => handleClick(data, key)} >
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
    setPageData(filteredData.slice((pageNum - 1) * 12, ((pageNum - 1) * 12) + 12))
  }, [pageNum, filteredData])

  return (
    <div className="container-fluid bodyContainer">
      <div className="tableContainer">
        <div className='pageBtnContainer'>
          <div className='pageBtn' onClick={prevPage} >< FaAngleLeft size={30} color={"orange"} /></div>
          <DropdownButton id="dropdown-basic-button" align="end" title="Language">
            <Dropdown.Item className="languageDropdown" onClick={() => setlang("English")}>English</Dropdown.Item>
            <Dropdown.Item className="languageDropdown" onClick={() => setlang("Hindi")}>Hindi</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" align="end" title="Sort By">
            <Dropdown.Item className="languageDropdown" onClick={() => setSortBy("name")} >Name</Dropdown.Item>
            <Dropdown.Item className="languageDropdown" onClick={() => setSortBy("artist")} >Artist</Dropdown.Item>
            {user ? <Dropdown.Item className="languageDropdown" onClick={() => setSortBy("user")} >Your Rating</Dropdown.Item> : null}
            <Dropdown.Item className="languageDropdown" onClick={() => setSortBy("average")} >Top Rating</Dropdown.Item>
          </DropdownButton>
          <div className='pageBtn' onClick={nextPage} >< FaAngleRight size={30} color={"orange"} /></div>
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

import { FaRegWindowClose, FaHeadphones } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"

const CardView = ({ rock, click, setClick, data }) => {
  const ratingChanged = (newrating) => {
    console.log(newrating)
  }

  // console.log(data)
  return (
    <div className="view child"
      style={{ display: `${isNaN(click) ? "none" : "flex"}` }}>
      {/* <Button className="bg-danger" onClick={() => setClick(NaN)} > Close </Button> */}
      <FaRegWindowClose className="closeIcon" onClick={() => setClick(NaN)} />
      <div className="card-component">
        <div className="card-img-wrapper">
          <img alt="card-img" src={isNaN(click) ? '' : data[click].image} className="card-img" />
        </div>
        <div className="card-text">
          <div className="song-header">
            <h2> {isNaN(click) ? '' : data[click].name} </h2>
            <h6> Artist - {isNaN(click) ? '' : data[click].artist} </h6>
            <h6> Album - {isNaN(click) ? '' : data[click].album} </h6>
            <h6> Release Date - {isNaN(click) ? '' : data[click].release_date} </h6>
          </div>
          <div className="ratings">
            <div className="rating-wrapper">
              <p>Your Rating:</p>
              <ReactStars count={5} onChange={ratingChanged} size={20} isHalf={true} value={5} />
            </div>
            <div className="rating-wrapper">
              <p> Overall Rating: </p>
              {/* <FaStar size={16} color={"gold"} style={{ margin: "auto 0" }} /> */}
              <ReactStars count={1} size={20} edit={false} value={1} />
              <p>4.5 (3)</p>
            </div>
          </div>
          <div className="play-icon-wrapper">
            <a href={isNaN(click) ? '' : data[click].url} >
              <FaHeadphones className="play-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardView;

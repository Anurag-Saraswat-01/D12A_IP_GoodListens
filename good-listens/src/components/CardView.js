import { FaRegWindowClose, FaHeadphones } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"

const CardView = ({ rock, click, setClick, data }) => {
  const ratingChanged = (newrating) => {
    console.log(newrating)
  }

  return (
    <div className="view child"
      style={{ display: `${isNaN(click) ? "none" : "flex"}` }}>
      {/* <Button className="bg-danger" onClick={() => setClick(NaN)} > Close </Button> */}
      <FaRegWindowClose className="closeIcon" onClick={() => setClick(NaN)} />
      <div className="card-component">
        <div className="card-img-wrapper">
          <img alt="Rock-img" src={rock} className="card-img" />
        </div>
        <div className="card-text">
          <div className="song-header">
            <h2> {isNaN(click) ? '' : data[click].name} </h2>
            <h6> Artist - Linkin Park </h6>
            <h6> Album - Hybrid Theory </h6>
            <h6>2000</h6>
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
            <a href="" >
              <FaHeadphones className="play-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardView;

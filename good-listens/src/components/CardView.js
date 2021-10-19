import { FaRegWindowClose, FaHeadphones } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"
import { useState, useEffect } from "react";

const CardView = ({ click, setClick, data, dataArr, updateRating, user }) => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [averageRating, setAverageRating] = useState(0)

  const ratingChanged = (newrating) => {
    updateRating(data.id, newrating)
  }

  const uid = user ? user.uid : null
  // sets rating after checking if something is clicked and user_rating exists in the db and uid exist in user_rating
  const rating = !isNaN(click) && data.user_rating && (uid in data.user_rating) ? data.user_rating[uid] : 0
  // returns a react-rating-stars-component if something is clicked, value depending on rating making it dynamic
  const ratingStars = !isNaN(click) ?
    <ReactStars count={5} onChange={ratingChanged} size={20} isHalf={true} value={rating} /> : null

  useEffect(() => {
    if (!isNaN(click) && data.user_rating) {
      setTotalUsers(Object.keys(data.user_rating).length)
      let sum = 0
      for (let rating in data.user_rating) {
        sum += data.user_rating[rating]
      }
      setAverageRating(sum / totalUsers)
    } else {
      setTotalUsers(0)
      setAverageRating(0)
    }
  }, [data, totalUsers, click])

  return (
    <div className="view child"
      style={{ display: `${isNaN(click) ? "none" : "flex"}` }}>
      <FaRegWindowClose className="closeIcon" onClick={() => setClick(NaN)} />
      <div className="card-component">
        <div className="card-img-wrapper">
          <img alt="card-img" src={isNaN(click) ? '' : data.image} className="card-img" />
        </div>
        <div className="card-text">
          <div className="song-header">
            <h2> {isNaN(click) ? '' : data.name} </h2>
            <h6> Artist - {isNaN(click) ? '' : data.artist} </h6>
            <h6> Album - {isNaN(click) ? '' : data.album} </h6>
            <h6> Release Date - {isNaN(click) ? '' : data.release_date} </h6>
          </div>
          <div className="ratings">
            <div className="rating-wrapper">
              <p>Your Rating:</p>
              {user ? <div>{ratingStars}</div>
                : <p className="sign-in-warning">Sign In to rate</p>}
            </div>
            <div className="rating-wrapper">
              <p> Overall Rating: </p>
              <ReactStars count={1} size={20} edit={false} value={1} />
              <p>{averageRating} ({totalUsers})</p>
            </div>
          </div>
          <div className="play-icon-wrapper">
            <a href={isNaN(click) ? '/' : data.url} >
              <FaHeadphones className="play-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardView;

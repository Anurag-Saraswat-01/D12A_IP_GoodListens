import { useState, useEffect } from "react";
import { FaRegWindowClose, FaHeadphones } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"

const CardView = ({ click, setClick, data, dataArr, updateRating, user }) => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [averageRating, setAverageRating] = useState(0)

  const uid = user ? user.uid : null

  const ratingChanged = (newrating) => {
    updateRating(data.id, newrating)
    console.log(data)
    if (data.user_rating) {
      data.user_rating[uid] = newrating
    } else {
      data.user_rating = {
        [uid]: newrating
      }
    }
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
  }

  // sets rating after checking if something is clicked and user_rating exists in the db and uid exist in user_rating
  const rating = !isNaN(click) && data.user_rating && (uid in data.user_rating) ? data.user_rating[uid] : 0
  // returns a react-rating-stars-component if something is clicked, value depending on rating making it dynamic
  const ratingStars = !isNaN(click) ?
    <ReactStars count={5} onChange={ratingChanged} size={20} isHalf={true} value={rating} classNames="react-stars" /> : null

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
            <h5> Artist - <span className="greyscale">{isNaN(click) ? '' : data.artist}</span> </h5>
            <h5> Album - <span className="greyscale">{isNaN(click) ? '' : data.album}</span>  </h5>
            <h5> Release Date - <span className="greyscale">{isNaN(click) ? '' : data.release_date}</span>  </h5>
          </div>
          <div className="ratings">
            <div className="rating-wrapper">
              <p>Your Rating:</p>
              {user ? <div>{ratingStars}</div>
                : <p className="sign-in-warning">Sign In to rate</p>}
            </div>
            <div className="rating-wrapper">
              <p> Overall Rating: </p>
              <ReactStars count={1} size={20} edit={false} value={1} className="react-star" />
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

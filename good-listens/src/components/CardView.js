const CardView = ({ rock }) => {
  return (
    <div className="view">
      <div className="card-component">
        <div className="card-img">
          <img alt="Rock-img" src={rock} width="400" className="" />
        </div>
        <div className="card-text">
          <p>
            <strong>Name: </strong>In the End
          </p>
          <p>
            <strong>Artist: </strong>Linkin Park
          </p>
          <p>
            <strong>Album: </strong>Hybrid Theory
          </p>
          <p>
            <strong>Genre: </strong>Rock
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardView;

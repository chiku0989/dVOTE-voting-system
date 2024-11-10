import "./UserInfoCard.css";



const UserInfoCard = (props) => {
  return (


    <div id="user-info-card" style={props.style}>
      <div className="card d-flex" style={{ width: "18rem" }}>
        <img style={{height : "286.66px" ,width: "286.66px" }} src={props.user.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h4 className=" text-center card-title">{props.user.name}</h4>
          
          <p className="card-text">
          <b>City</b> : {props.user.city}
          </p>

          <p className="card-text">
          <b>State</b> : {props.user.state}
          </p>

          <p className="card-text">
          <b>Varification Status</b> : { props.user.isVarified ? (<span style={{color: 'green'}}>Varified</span>) : (<span style={{color: 'red'}}>Not Varified</span>)}
          </p>

          <p className="card-text">
          <b>Account Address</b> : {props.user.accAddress}
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default UserInfoCard;

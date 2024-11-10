import "./MidSection.css"
import { useNavigate } from "react-router-dom";
//img import
import banner from "./../../images/login-pg-1.png"
const MidSection = (props) => {


const navigate = useNavigate()
  return (
    <div id="mid-section-outer" className="container d-flex">
      <div className="container" id="mid-section-main">
        <h1 className="fs-1">Welcome to dVOTE</h1>
        <p className="fs-5">ETH based decentalized voting system </p>
        <div>
        <button onClick={()=> {
          return navigate("/register");
        }} type="button" className="homepage-btn btn btn-lg btn-dark">
          Register
        </button>
        <button onClick={props.handleLogin} type="button" className="homepage-btn btn btn-lg btn-outline-dark">
          Login
        </button>
        </div>
        
      </div>
      <img id="login-side-banner" src={banner} alt="Banner"/>
    </div>
  );
};

export default MidSection;

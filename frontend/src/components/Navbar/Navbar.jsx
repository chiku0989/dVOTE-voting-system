import "./Navbar.css"
import {Link} from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn")
  const logout = ()=>{
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userType");
    window.location.href = "/";
  }
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand fs-3" to="/">dVOTE</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav fs-5">
              <Link className="nav-link" to="/candidatelist">Candidate List</Link>
              <Link className="nav-link" to="/voterlist">Voter List</Link>
             {!isLoggedIn && <Link className="nav-link" to="/register">Register</Link>} 
             
            </div>
            {isLoggedIn && <button className="btn btn-md btn-danger" onClick={logout}>logut</button>}
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
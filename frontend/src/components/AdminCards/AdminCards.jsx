import React from "react";
import { useState } from "react";
import "./AdminCards.css";
import FeatureCard from "../FeatureCard/FeatureCard";
import securityImg from "../../images/login-security.jpg";
import candidateImg from "../../images/candidate.jpg"
import voterImg from "../../images/voter.jpg"
import timeImg from "../../images/time.jpg"
import resetImg from "../../images/reset.jpg"
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { ContractAddress, ContractABI } from '../../contact/contract'

const AdminCards = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const setVotingTime = async(startTime, endTime)=>{
    if(window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const votingContract = new ethers.Contract(ContractAddress, ContractABI, signer);
        const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
        const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);
        await votingContract.setVotingTime(startTimestamp, endTimestamp);
      }catch(e){
        alert("Error in connecting smart contract" + e);
        navigate('/');
      }
    } else {
      alert("Please Install MetaMask")
      navigate('/');
    }
  }

  const resetElection = ()=>{
    alert("Cannot reset election during voting time");
  }
  return (
    <div className="container">
      <div className="row g-2">
        <div className="col-lg-3 col-md-6 d-flex justify-content-center">
          <FeatureCard
            title="Approve Voters"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            img={voterImg}
            btn="true"
            link="/approvevoter"
            color="black"
          />
        </div>

        <div className="col-lg-3 col-md-6 d-flex justify-content-center">
          <FeatureCard
            title="Approve Candidates"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            img={candidateImg}
            btn="true"
            link="/approvecandidate"
            color="black"
          />
        </div>

        {/* Set Voting Time */}

        <div className="col-lg-3 col-md-6 d-flex justify-content-center">
        <div className="card" id="date-card" style={{ width: "18rem" }}>
          <img
            src={timeImg}
            id="date-card-img"
            className="card-img-top"
            alt="Voting Time"
          />
          <div className="card-body">
            <h5 className="card-title">Set Voting Time</h5>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            {/* Button to open modal */}
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="btn btn-dark"
            >
              Open
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-around">
              <div className="holder"> 
                start date <br />
                <input type="date" onChange={(e) => { setStartDate(e.target.value )}}/>
              </div>
              <div className="holder">
              end date <br />
              <input type="date" onChange={(e) => { setEndDate(e.target.value )}}/>
              </div>
              {startDate && <p> {startDate} </p>}
              {endDate && <p> {endDate} </p>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"

                onClick={()=>{
                  setVotingTime(startDate,endDate);
                }}
              >
                set
              </button>

            </div>
          </div>
        </div>
      </div>


        <div className="col-lg-3 col-md-6 d-flex justify-content-center">
          <FeatureCard
            title="Reset Elections"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            img={resetImg}
            btn="true"
            color="red"
            function={resetElection}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCards;

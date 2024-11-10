import "./DashBoard.css";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { ContractAddress, ContractABI } from "../../contact/contract";
import ScrollableSection from "../ScrollableSection/ScrollableSection";

const DashBoard = ({ user, time = [0,0] }) => {
  console.log(user)
  const navigate = useNavigate();
  const [candidateList, setCandidateList] = useState(null);
  const [isVotingAllowed, setIsVotingAllowed] = useState(false);
  const [ canVote, setCanVote ] = useState(null);

  const handleList = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const votingContract = new ethers.Contract(
          ContractAddress,
          ContractABI,
          provider
        );
        // Get the list of all voters
        const list = await votingContract.getApprovedCandidates();

        setCandidateList(list); // Set the fetched list in state
      } catch (e) {
        alert("Error in connecting to Ethereum: " + e);
      }
    } else {
      alert("Please Install MetaMask");
      navigate("/");
    }
  };

  const castVote = async (candidateAddress) => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const votingContract = new ethers.Contract(
          ContractAddress,
          ContractABI,
          signer
        );
        votingContract.vote(candidateAddress);
      } catch (e) {
        alert("Error in connecting to Ethereum : " + e);
      }
    } else {
      alert("Please Install MetaMask");
      navigate("/");
    }
  };

  function convertUnixToHumanReadable(unixTimestamp) {
    // Convert to milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Format the date
    const options = {
      year: "numeric",
      month: "long", // e.g., November
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short", // Include timezone
    };

    return date.toLocaleString("en-IN", options);
  }

  const checkVotingAllowed = async() => {
    // Check if time is an array with at least two elements
    if (Array.isArray(time) && time.length === 2) {
      const currentUnixTime = Math.floor(Date.now() / 1000);
      if (currentUnixTime > time[0] && currentUnixTime < time[1]) {
        setIsVotingAllowed(true);
      }
    }
    if(window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const votingContract = new ethers.Contract(ContractAddress,ContractABI,provider);
        const currUser = await votingContract.voters(user.accAddress);
        setCanVote(currUser.canVote);
      } catch(e){

      }
    }else{
      alert("Please Install MetaMask");
      navigate('/');
    }
  };
  
console.log(canVote);

  useEffect(() => {
    handleList();
    checkVotingAllowed();
  },  [time, user]); // Empty dependency array ensures it only runs once

  return (
    <div
      className=" container d-flex align-items-center justify-content-center"
      style={{ padding: "10px", marginTop: "10px", marginBottom: "10px" }}
    >
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          height: "80vh",
          backgroundColor: "#F5F5F7",
          borderRadius: "10px",
          margin: "20px",
        }}
      >
        {user && (
          <div
            className=" container d-flex justify-content-evenly user-info-holder"
            style={{ margin: "30px" }}
          >
            <UserInfoCard user={user} />
            <div
              style={{ margin: "10px", padding: "20px" }}
            >
              <div className="d-flex justify-content-evenly flex-column" style={{ borderRadius : '10px'}} >
              <h1 className="text-center" style={{ margin: "30px", marginBottom : '30px' }}>
                {" "}
                Welcome {user.name}
              </h1>
              <div style={{margin: '10px', padding : '10px'}} className="container d-flex justify-content-evenly flex-column">
                <p>
                  Voting Date <br /> From :{" "}
                  {convertUnixToHumanReadable(time[0].toString())} <br /> to :{" "}
                  {convertUnixToHumanReadable(time[1].toString())}{" "}
                </p>

                {isVotingAllowed && canVote ? (
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#votingSection"
                    className=" container-fluid btn btn-lg btn-primary"
                    style={{marginRight : "20px"}}
                  >
                    {" "}
                    VOTE{" "}
                  </button>
                  ) : (
                    <div>
<button
                    disabled
                    data-bs-toggle="modal"
                    data-bs-target="#votingSection"
                    className=" container-fluid btn btn-lg btn-primary"
                    style={{marginRight : "20px"}}
                  >
                    {" "}
                    VOTE{" "}
                  </button>
                    </div>
                  
                  
                )}
              </div>
                {/* Modal */}
                <div
                  class="modal fade"
                  id="votingSection"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title fs-5 text-center"
                          id="staticBackdropLabel"
                        >
                          Candidate List
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        {candidateList && (
                          <ScrollableSection
                            function={castVote}
                            type="candidate"
                            list={candidateList}
                            btn="true"
                            btnText="Vote"
                          />
                        )}
                      </div>
                      <div class="modal-footer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;

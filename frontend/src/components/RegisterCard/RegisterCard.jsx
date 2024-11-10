import React, { useState } from "react";
import "./RegisterCard.css";

import { ethers } from "ethers";
import { ContractAddress,ContractABI } from "../../contact/contract";
import { useNavigate } from "react-router-dom";


const RegisterCard = () => {

  const navigate = useNavigate();
  //declaring the useState
  const [isCandidate, setIsCandidate] = useState(false);
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [accAddress, setAccAddress] = useState("");
  const [partyName, setPartyName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgHash , setImgHash] = useState(null);

  const [dialogueContent, setDialogueContent] = useState(null)
  const handleRadioChange = (event) => {
    setIsCandidate(event.target.value === "candidate");
  };

  //get the metamask account address
  async function getMetaMask() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setAccAddress(account);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  //on click of submit button
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    console.log("Full Name:", fullName);
    console.log("City:", city);
    console.log("State:", state);
    console.log("Aadhar:", aadhar);
    console.log("MetaMask:", accAddress);
    console.log("IMG : " , imgFile);
    if (isCandidate) {
      console.log("Party Name:", partyName);
    }

    const formData = new FormData();

    formData.append("photo", imgFile);
    try{
      const response = await fetch("http://localhost:5000/photo", {
        method : 'POST',
        body : formData
      })
      if(response.ok) {
        const responseData = await response.json();
        console.log(responseData.message)
        setImgHash(responseData.pinataResponse.IpfsHash)
      }
    } catch(e){
      console.log(e);
      return alert("error in uploading the photo, please try after some time")
    }
    if(imgHash) {
      console.log("creating instance");
      //creating a new instance of the contract
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const singer = provider.getSigner()
        const voitngContract = new ethers.Contract(ContractAddress,ContractABI,singer)

        if(isCandidate){
          console.log("entered candidate block")
          const result = await voitngContract.addCandidate(fullName,imgHash,partyName,state,city,aadhar,accAddress)
          console.log(result);
          const voter = await voitngContract.getVoter(accAddress);
          if(voter.name === ""){
            const output = voitngContract.addVoter(fullName,imgHash,state,city,aadhar,accAddress);
            console.log(output)
          }
        }else{
          console.log("entered voter block")
          const result = await voitngContract.addVoter(fullName,imgHash,state,city,aadhar,accAddress);
          console.log(result);
        }
        alert("Your Account Creation Request has been generated, we will verify your data");
      }catch(e){
       console.log("error in connecting to the eth : " + e)
       alert("Your Account Creation Request has failed, please try again")
      }
      navigate("/");

    }


  };

  return (
    <div>
      <div className=" register-card-main container mt-5">
        <div className="card" style={{ width: "30rem", margin: "auto" }}>
          <div className="card-body">
            <h4 className="text-center">Register User</h4>
            <form id="register-user-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  id="full-name"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupFile01">
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*" 
                  className="form-control"
                  id="inputGroupFile01"
                  onChange={(e) => setImgFile(e.target.files[0])}
                />
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="user-type"
                  id="candidate"
                  value="candidate"
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="candidate">
                  Candidate
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="user-type"
                  id="voter"
                  value="voter"
                  defaultChecked
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="voter">
                  Voter
                </label>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="party-name"
                  placeholder="Party Name"
                  autoComplete="off"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  disabled={!isCandidate}
                  required={isCandidate}
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  aria-label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <span className="input-group-text">@</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  aria-label="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  className="form-control"
                  autoComplete="off"
                  type="number"
                  id="aadhar-number"
                  placeholder="Aadhar Number"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value)}
                />
              </div>

              <div className="mb-3 d-flex">
                <input
                  type="text"
                  id="metamaskId"
                  className="form-control"
                  placeholder="MetaMask Account"
                  value={accAddress}
                  disabled
                />
                <button
                  type="button"
                  onClick={getMetaMask}
                  className="btn btn-primary get-metamask-id-btn"
                >
                  Get
                </button>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;

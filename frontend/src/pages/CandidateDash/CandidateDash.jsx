import React from "react";
import "./CandidateDash.css";
import Navbar from "../../components/Navbar/Navbar";
import DashBoard from "../../components/DashBoard/DashBoard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { ContractAddress, ContractABI } from "../../contact/contract";

const CandidateDash = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [votingTime, setVotingTime] = useState(null);

  const getAddress = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const accountAddress = accounts[0];
  

        await fetchUserInfo(accountAddress);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        alert("Error connecting to MetaMask. Please try again.");
      }
    } else {
      alert("Please install MetaMask");
      navigate("/");
    }
  };

  const fetchUserInfo = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const votingContract = new ethers.Contract(
        ContractAddress,
        ContractABI,
        provider
      );
      const tempUser = await votingContract.voters(address);
      const time =  await votingContract.getVotingTime()
      setUser({
        name: tempUser.name,
        img: `https://gateway.pinata.cloud/ipfs/${tempUser.img}`,
        city: tempUser.loc.city,
        state: tempUser.loc.state,
        isVarified: tempUser.approved,
        aadharNo: tempUser.aadharNo,
        accAddress: tempUser.voterAdd,
        votingStatus: tempUser.canVote,
      });
      setVotingTime(time)
    } catch (error) {
      alert(`Error connecting to the smart contract: ${error.message}`);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div>
      <DashBoard user={user} time={votingTime} />
    </div>
  );
};

export default CandidateDash;

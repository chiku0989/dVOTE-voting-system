import React, { useEffect, useState } from 'react';
import "./VoterList.css";
import Navbar from "./../../components/Navbar/Navbar";
import ScrollableSection from '../../components/ScrollableSection/ScrollableSection';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { ContractAddress, ContractABI } from '../../contact/contract';

const VoterList = () => {
  const navigate = useNavigate();
  const [voterList, setVoterList] = useState(null);

  const handleList = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const votingContract = new ethers.Contract(ContractAddress, ContractABI, provider);
        // Get the list of all voters
        const list = await votingContract.getApprovedVoters();
        
        setVoterList(list);  // Set the fetched list in state
      } catch (e) {
        alert("Error in connecting to Ethereum: " + e);
      }
    } else {
      alert("Please Install MetaMask");
      navigate("/");
    }
  };

  // Run handleList once when the component mounts
  useEffect(() => {
    handleList();
  }, []); // Empty dependency array ensures it only runs once

  // Log when voterList updates
  useEffect(() => {
    if (voterList) {
      console.log("Voter list has been updated:");
    }
  }, [voterList]);  // This will run whenever voterList is updated

  return (
    <div id="vote-list-page">
      {voterList && <ScrollableSection title="Voters' List" type="voter" list={voterList} />}
    </div>
  );
};

export default VoterList;

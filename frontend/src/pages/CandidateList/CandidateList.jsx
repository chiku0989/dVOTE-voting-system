import React, { useState, useEffect } from 'react';
import "./CandidateList.css";
import Navbar from '../../components/Navbar/Navbar';
import ScrollableSection from '../../components/ScrollableSection/ScrollableSection';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { ContractAddress, ContractABI } from '../../contact/contract';

const CandidateList = () => {
  const navigate = useNavigate();  // Correctly invoking useNavigate as a function
  const [candidateList, setCandidateList] = useState([]);

  const handleList = async () => {
    if (window.ethereum) {
      try {
        console.log("Creating instance...");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const votingContract = new ethers.Contract(ContractAddress, ContractABI, provider);
        
        // Get the list of all candidates
        const list = await votingContract.getApprovedCandidates();
        setCandidateList(list);  // Set the fetched list in state
      } catch (e) {
        alert("Error in connecting to Ethereum: " + e);
      }
    } else {
      alert("Please Install MetaMask");
      navigate("/");  // Use navigate as a function
    }
  };

  useEffect(() => {
    handleList();
  }, []);  // Empty dependency array ensures it only runs once when the component mounts

  return (
    <div>
      <ScrollableSection title="Candidates' List" type="candidate" list={candidateList} />
    </div>
  );
};

export default CandidateList;

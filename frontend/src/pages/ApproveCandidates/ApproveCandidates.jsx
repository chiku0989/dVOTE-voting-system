import React from 'react'
import './ApproveCandidates.css'

import Navbar from '../../components/Navbar/Navbar'

import ScrollableSection from '../../components/ScrollableSection/ScrollableSection'
import { useState,  useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers'
import { ContractAddress, ContractABI } from '../../contact/contract'
const ApproveCandidates = () => {

  const navigate = useNavigate();
  const [candidateList, setCandidateList] = useState(null);

  const handleList = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const votingContract = new ethers.Contract(ContractAddress, ContractABI, provider);
        // Get the list of all voters
        const list = await votingContract.getNonApprovedCandidates();
        

        setCandidateList(list);  // Set the fetched list in state
      } catch (e) {
        alert("Error in connecting to Ethereum: " + e);
      }
    } else {
      alert("Please Install MetaMask");
      navigate("/");
    }
  };

  const onApprove = async(accAddress)=>{
    if(window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const votingContract = new ethers.Contract(ContractAddress, ContractABI, signer)
        await votingContract.approveCandidate(accAddress)
      } catch (e) {
        alert("error : " + e)
        navigate("/ownerdash");
      }
    }else{
      alert("Please Install MetaMask");
      navigate("/");
    }
  }

  useEffect(() => {
    handleList();
  }, []); // Empty dependency array ensures it only runs once

  // Log when voterList updates
  useEffect(() => {
    if (candidateList) {
      console.log("Candidate list has been updated:");
    }
  }, [candidateList]);  // This will run whenever voterList is updated


  return (
    <div>
      { candidateList && <ScrollableSection title="Approve Candidates" type="candidate" list={candidateList} btn='true' btnText="Approve" function={onApprove}/>}
    </div>
  )
}

export default ApproveCandidates
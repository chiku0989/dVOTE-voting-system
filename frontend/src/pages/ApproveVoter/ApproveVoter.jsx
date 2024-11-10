import React from 'react'
import './ApproveVoter.css'

import Navbar from '../../components/Navbar/Navbar'

import ScrollableSection from '../../components/ScrollableSection/ScrollableSection'
import { useState,  useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers'
import { ContractAddress, ContractABI } from '../../contact/contract'
export const ApproveVoter = () => {
  const navigate = useNavigate();
  const [voterList, setVoterList] = useState(null);

  const handleList = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const votingContract = new ethers.Contract(ContractAddress, ContractABI, provider);
        // Get the list of all voters
        const list = await votingContract.getNonApprovedVoters();
        

        setVoterList(list);  // Set the fetched list in state
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
        await votingContract.approveVoter(accAddress)
      } catch (e) {
        alert("error : " + e)
        navigate("/ownerdash");
      }
    }else{
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
      console.log("Voter list has been updated:", voterList);
    }
  }, [voterList]);  // This will run whenever voterList is updated

  return (
    <div>
      {voterList && <ScrollableSection title="Approve Voters" type="voter" list={voterList} btn='true' btnText="Approve" function={onApprove}/>}
    </div>
  )
}

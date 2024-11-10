import './UserCard.css'
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ContractAddress, ContractABI } from '../../contact/contract';
import { useNavigate } from 'react-router-dom';

const UserCard = (props) => {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [name, setName] = useState(null);
  const [party, setParty] = useState(null);
  const [voteCount, setVoteCount] = useState(null);
  const getValues = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const votingContract = new ethers.Contract(ContractAddress, ContractABI, provider);
        
        // Fetch data based on whether the user is a candidate or voter
        let user;
        if (props.type === "candidate") {
          user = await votingContract.candidates(props.add); // Await for the promise
        } else {
          user = await votingContract.voters(props.add); // Await for the promise
        }
        // Set state based on retrieved data
        setName(user.name);
        setParty(props.type === "candidate" ? user.party : null);
        setVoteCount(props.type === "candidate" ? user.voteCount : null);
        // Construct the image URL from the IPFS hash
        setImg(`https://gateway.pinata.cloud/ipfs/${user.img}`);
        console.log(user)
      } catch (e) {
        alert("Error in connecting to the Ethereum network: " + e.message);
        navigate('/');
      } 
    } else {
      alert("Please install MetaMask");
      navigate('/');
    }
  };

  const checkCanVote = async()=>{
   
  }

  useEffect(() => {
    getValues();
  }, []);

  return (
    <div className="card" id="user-card" style={{ width: '16rem' }}>
      <img className="card-img-top" src={img} style={{ height: '220.156px' }} alt="Profile" />
      <div className="card-body" style={{paddingBottom: '7px'}}>
        <h4 className="card-title text-center">{name}</h4>
        <div className="card-text">
          <p><b>Account Address : </b> {props.add}</p>
          {party && <p><b>Party : </b> {party}</p>}
          {party && <p> <b>Vote Count :</b> {voteCount.toString()} </p>}
        </div>
        {props.btn && (
           <div className="d-flex justify-content-center">
              <button className="btn btn-primary container" onClick={()=>{ props.function(props.add)}}>{props.title}</button>
           </div>
        )}
      </div>

    </div>
  );
};

export default UserCard;

import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";
import MidSection from "../../components/MidSection/MidSection";
import Features from "../../components/Features/Features";
//ethers
import { ethers } from "ethers";
import { ContractAddress, ContractABI } from "./../../contact/contract.js";
//react router dom
import { useNavigate } from "react-router-dom";
const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const logout = ()=>{
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userType");
    window.location.href = "/";
  }
  
  async function handleLogin() {
    if (window.ethereum) {
      try {
        // Getting user's account address from MetaMask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];

        // If user decides to switch account
        window.ethereum.on("accountsChanged", handleAccountChange);

        // Login logic
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          // Instance of smart contract
          const votingContract = new ethers.Contract(
            ContractAddress,
            ContractABI,
            provider
          ); 
          const owner = await votingContract.owner();

          // Checking if user is Owner/Candidate/Voter/Non
          if (account.toLowerCase() === owner.toLowerCase()) {
            setUser({ accountAdd: account.toLowerCase(), type: "owner" });
            window.localStorage.setItem("isLoggedIn", "true");
            window.localStorage.setItem("userType", "admin")
            navigate("/ownerdash");
          } else {
            const candidateList = await votingContract.getAllCandidates();
            const voterList = await votingContract.getAllVoters();
            if (
              candidateList
                .map((addr) => addr.toLowerCase())
                .includes(account.toLowerCase())
            ) {
              setUser({ accountAdd: account.toLowerCase(), type: "candidate" })
              window.localStorage.setItem("isLoggedIn", "true");
              window.localStorage.setItem("userType", "candidate")
              navigate("/candidatedash");
            } else if (
              voterList
                .map((addr) => addr.toLowerCase())
                .includes(account.toLowerCase())
            ) {
              setUser({ accountAdd: account.toLowerCase(), type: "voter" })
              window.localStorage.setItem("isLoggedIn", "true");
              window.localStorage.setItem("userType", "voter")
              navigate("/voterdash");
            } else {
              navigate("/register");
            }
          }
        } catch (e) {
          alert("An error occurred during contract interaction: ", e);
        }
      } catch (e) {
        alert(`Error connecting MetaMask: ${e}`);
      }
    } else {
      alert("MetaMask not found. Please install MetaMask.");
    }
  }

  function handleAccountChange(accounts) {
    if (accounts.length === 0) {
      alert("please connect to MetaMask");
    } else {
      logout();
    }
  }

  return (
    <div>
      <MidSection handleLogin={handleLogin} />
      <Features />
    </div>
  );
};

export default Login;

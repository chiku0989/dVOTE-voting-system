import React from 'react'
import './OwnerDashBoard.css'
import Navbar from '../../components/Navbar/Navbar'
import Welcome from '../../components/Welcome/Welcome'
import AdminCards from '../../components/AdminCards/AdminCards'

import img from "./../../images/dark-backgound.jpg"
const OwnerDashBoard = () => {
  return (
    <div>
      <Welcome height='50vh' backgroundImg={img} user="Admin" titleLoc='center'/>
      <div className="container-fluid" id="admin-card-holder">
      <AdminCards />
      </div>
    </div>
  )
}

export default OwnerDashBoard;
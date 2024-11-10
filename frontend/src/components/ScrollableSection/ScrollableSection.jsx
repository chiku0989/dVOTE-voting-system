import React from 'react'
import "./ScrollableSection.css"
import UserCard from "../UserCard/UserCard"

const ScrollableSection = (props) => {
  return (
    <>
    <div className='container list-cards-section scrollable-container overflow-y-scroll'>
      <h3 className='text-center' id="list-top-text">{props.title}</h3>
        <div className="container">
        <div className="row d-flex justify-content-center">
          {props.list.map((address, index) =>{
            return (<div className="d-flex justify-content-center col-lg-4 col-md-4 col-sm-12" key={index}>  
            <UserCard 
            add={address} 
            type={props.type}
            {...(props.btn && { btn: props.btn, function: props.function , title : props.btnText})}
            />
            </div>)
          })}
        </div>

        </div>
      </div>

    </>
  )
}

export default ScrollableSection
import React, { useState } from 'react';
import avatar from "../assets/Group 6782.svg"
import avatar2 from "../assets/avatar.svg"

const User = ({ transactData }) => {
    console.log(transactData)


    return (
        <div className='user'>
            <div className='user-cont'>
                {transactData.type === "deposit" ? <img src={avatar} alt="" style={{ width: "48px", height: "48px" }} /> :
                    <img src={avatar2} alt="" style={{ width: "48px", height: "48px" }} />}
                <div className='user-left'>
                    <p style={{ fontSize: "16px", color: "#131316" }}>lol</p>
                    <p>{transactData.type === "withdrawal" && transactData.status}</p>
                    <p>{transactData.type === "deposit" && transactData.metaData?.name}</p>
                </div>
            </div>
            <div className='user-right'>
                <p style={{ fontSize: "16px", color: "#131316" }}>USD {transactData.amount}</p>
                <p>{transactData.date}</p>
            </div>
        </div>
    )
}

export default User

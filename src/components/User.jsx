import React, { useState } from 'react';
import avatar from "../assets/Group 6782.svg"
import avatar2 from "../assets/avatar.svg"
import clsx from 'clsx';
import { formatDate } from '../utils';

const User = ({ transactData, metaData }) => {

    const formattedDate = formatDate(transactData.date)
    return (
        <div className='user'>
            <div className='user-cont'>
                {transactData.type === "deposit" ? <img src={avatar} alt="" style={{ width: "48px", height: "48px" }} /> :
                    <img src={avatar2} alt="" style={{ width: "48px", height: "48px" }} />}
                <div className='user-left'>
                    <p style={{ fontSize: "16px", color: "#131316" }}>{metaData && metaData.product_name}</p>
                    <p style={{ fontSize: "16px", color: "#131316" }}>{transactData.type === "withdrawal" && "Cash Withdrawal"}</p>
                    <p className={clsx("status-successful", {
                        "status-pending": transactData.status === "pending",
                    })}>{transactData.type === "withdrawal" && transactData.status}</p>
                    <p style={{ fontSize: "14px" }}>{metaData && metaData.name}</p>
                </div>
            </div>
            <div className='user-right'>
                <p style={{ fontSize: "16px", color: "#131316" }}>USD {transactData.amount}</p>
                <p style={{ fontSize: "14px" }}>{formattedDate}</p>
            </div>
        </div>
    )
}

export default User

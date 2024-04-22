import React, { useEffect, useState } from 'react';
import avi from "../assets/avi.svg";
import home from "../assets/home.svg"
import { getUserData } from '../services/apiService';
import { abbreviateName } from '../utils';

const Menu = () => {
    const [user, setUser] = useState("")
    const [abbrevatedName, setAbbrevatedName] = useState("")

    async function getUser() {
        let user = await getUserData()
        user.name = `${user.first_name} ${user.last_name}`
        setUser(user)
        const name = abbreviateName(user.name)
        setAbbrevatedName(name)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className='menu-dropdown'>
            <div className='menu-head'>
                <div className='name-abbrevate'>{abbrevatedName}</div>
                <span>
                    <p>{user.name}</p>
                    <p style={{ fontSize: "12px", color: "#56616B" }}>{user.email}</p>
                </span>
            </div>
            <div className='menu-item'>
                <img src={home} alt="" />
                <p>Settings</p>
            </div>
            <div className='menu-item'>
                <img src={home} alt="" />
                <p>Purchase history</p>
            </div>
            <div className='menu-item'>
                <img src={home} alt="" />
                <p>Refer and Earn</p>
            </div>
            <div className='menu-item'>
                <img src={home} alt="" />
                <p>Integrations</p>
            </div>
            <div className='menu-item'>
                <img src={home} alt="" />
                <p>Report Bug</p>
            </div>
            <div className='menu-item'>
                <img src={home} alt="" />
                <p>Switch Account</p>
            </div>
            <div className='menu-item'>
                <img src={home} alt="" />
                <p>Sign Out</p>
            </div>
        </div>
    )
}

export default Menu

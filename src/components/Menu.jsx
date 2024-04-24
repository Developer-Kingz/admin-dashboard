import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/apiService';
import { abbreviateName } from '../utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCreditCard, faTh, faBug, faVcard, faSignOut, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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
                <FontAwesomeIcon
                    icon={faCog}
                />
                <p>Settings</p>
            </div>
            <div className='menu-item'>
                <FontAwesomeIcon
                    icon={faShoppingCart}
                />
                <p>Purchase history</p>
            </div>
            <div className='menu-item'>
                <FontAwesomeIcon icon={faCreditCard} />
                <p>Refer and Earn</p>
            </div>
            <div className='menu-item'>
                <FontAwesomeIcon icon={faTh} />
                <p>Integrations</p>
            </div>
            <div className='menu-item'>
                <FontAwesomeIcon
                    icon={faBug}
                />
                <p>Report Bug</p>
            </div>
            <div className='menu-item'>
                <FontAwesomeIcon
                    icon={faVcard}
                />
                <p>Switch Account</p>
            </div>
            <div className='menu-item'>
                <FontAwesomeIcon
                    icon={faSignOut}
                />
                <p>Sign Out</p>
            </div>
        </div>
    )
}

export default Menu

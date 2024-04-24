import React, { useEffect, useState } from 'react'
import mainstack from "../assets/mainstack-logo.svg";
import home from "../assets/home.svg";
import analytics from "../assets/insert_chart.svg";
import revenu from "../assets/payments.svg";
import group from "../assets/group.svg";
import widgets from "../assets/widgets.svg";
import bell from "../assets/small tertiary button.svg";
import frame from "../assets/Frame 6853.svg";
import avi from "../assets/avi.svg";
import menu from "../assets/menu.svg"
import clsx from 'clsx';
import { abbreviateName } from '../utils';
import { getUserData } from '../services/apiService';

const Header = (props) => {
    const [abbrevatedName, setAbbrevatedName] = useState("")

    async function getUser() {
        let user = await getUserData()
        user.name = `${user.first_name} ${user.last_name}`
        const name = abbreviateName(user.name)
        setAbbrevatedName(name)
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <div className='header'>
            <div className='header-inner'>
                <div className='logo'>
                    <img src={mainstack} alt="" className='mainstack-logo' />
                </div>
                <div className='middle'>
                    <div className='middle-inner'>
                        <div className='rev-inner'>
                            <img src={home} alt="" style={{ width: "20px", height: "20px" }} />
                            <span style={{ fontSize: "16px" }}>Home</span>
                        </div>
                    </div>
                    <div className='middle-inner'>
                        <div className='rev-inner'>
                            <img src={analytics} alt="" style={{ width: "20px", height: "20px" }} />
                            <span style={{ fontSize: "16px" }}>Analytics</span>
                        </div>
                    </div>
                    <div className='middle-inner'>
                        <div className={clsx("revenu", {
                            "revenu-white": props.menuShow,
                        })}>
                            <div className='rev-inner'>
                                <img src={revenu} alt="" style={{ width: "20px", height: "20px" }} />
                                <span style={{ fontSize: "16px" }}>Revenu</span>
                            </div>
                        </div>
                    </div>
                    <div className='middle-inner'>
                        <div className='rev-inner'>
                            <img src={group} alt="" style={{ width: "20px", height: "20px" }} />
                            <span style={{ fontSize: "16px" }}>CRM</span>
                        </div>
                    </div>
                    <div className='middle-inner'>
                        <div className='rev-inner'>
                            <img src={widgets} alt="" style={{ width: "20px", height: "20px" }} />
                            <span style={{ fontSize: "16px" }}>Apps</span>
                        </div>
                    </div>
                </div>
                <div className='menu'>
                    <div className='icon'>
                        <img src={bell} alt="" />
                    </div>
                    <div className='icon'>
                        <img src={frame} alt="" />
                    </div>
                    <div className='menu-cover' onClick={props.popMenu}>
                        <div className='name-abbrevate'>{abbrevatedName}</div>
                        <div className='icon'>
                            <img src={menu} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

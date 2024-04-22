import React, { useEffect, useState } from 'react'
import info from "../assets/info.svg";
import download from "../assets/download.svg";
import expand from "../assets/expand_more.svg"
import User from '../components/User';
import appIcon1 from "../assets/app-icon1.svg"
import appIcon2 from "../assets/app-icon2.svg"
import appIcon3 from "../assets/app-icon3.svg"
import appIcon4 from "../assets/app-icon4.svg"
import Menu from '../components/Menu';
import Header from "../components/Header"
import FilterMenu from '../components/FilterMenu';
import { getTransactions, getWalletData } from '../services/apiService';

const Dashboard = () => {
    const [menuShow, setMenuShow] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [walletData, setWalletData] = useState()
    const [transactions, setTransactions] = useState([])
    console.log(transactions.payment_reference)

    const popMenu = () => {
        console.log("clicked")
        setMenuShow(!menuShow)
    }
    const popFilters = () => {
        console.log("clicked")
        setShowFilters(!showFilters)
    }

    async function getWallet() {
        let wallet = await getWalletData()
        console.log(wallet)
        setWalletData(wallet)
    }

    async function getTransactionsData() {
        let data = await getTransactions()
        console.log(data)
        setTransactions(data)
    }

    useEffect(() => {
        getWallet()
        getTransactionsData()
    }, [])

    return (
        <div className='dash-cont'>
            <Header popMenu={popMenu} menuShow={menuShow} />
            <div className='icon-list'>
                <img src={appIcon1} alt="" className='single-icon' />
                <img src={appIcon2} alt="" className='single-icon' />
                <img src={appIcon3} alt="" className='single-icon' />
                <img src={appIcon4} alt="" className='single-icon' />
            </div>
            {menuShow && <Menu />}
            {showFilters && <FilterMenu setShowFilters={setShowFilters} showFilters={showFilters} />}
            <div className='analytics'>
                <div className='graph'></div>
                <div className='right'>
                    <div className='r-inner'>
                        <span className='info'>
                            <p className='small-font'>ledger Balance</p>
                            <img src={info} alt="" />
                        </span>
                        <span className='big-font'>USD {walletData?.ledger_balance}</span>
                    </div>
                    <div className='r-inner'>
                        <span className='info'>
                            <p className='small-font'>Total payout</p>
                            <img src={info} alt="" />
                        </span>
                        <span className='big-font'>USD {walletData?.total_payout}</span>
                    </div>
                    <div className='r-inner'>
                        <span className='info'>
                            <p className='small-font'>Total Revenue</p>
                            <img src={info} alt="" />
                        </span>
                        <span className='big-font'>USD {walletData?.total_revenue}</span>
                    </div>
                    <div className='r-inner'>
                        <span className='info'>
                            <p className='small-font'>Pending Payout</p>
                            <img src={info} alt="" />
                        </span>
                        <span className='big-font'>USD {walletData?.pending_payout}</span>
                    </div>
                </div>
            </div>
            <div className='transactions'>
                <div className='transaction-left'>
                    <p className='big-font'>24 Transactions</p>
                    <p className='small-font'>Your transactions for thr last 7 days</p>
                </div>
                <div className='transaction-right'>
                    <button className='btn' onClick={popFilters}>Filter
                        <img src={expand} alt="" />
                    </button>
                    <button className='export-btn'>Export list
                        <img src={download} alt="" />
                    </button>
                </div>
            </div>
            <div className='users'>
                {
                    transactions.map((transactData, i) => {
                        return <User transactData={transactData} key={i} />
                    })
                }
                {/* <User />
                <User />
                <User /> */}
            </div>
        </div>
    )
}

export default Dashboard

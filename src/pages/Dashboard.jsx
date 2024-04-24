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
import Chart from '../components/Chart';

const Dashboard = () => {
    const [menuShow, setMenuShow] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [walletData, setWalletData] = useState()
    const [transactions, setTransactions] = useState([])

    const date1 = new Date(transactions[0]?.date);
    const date2 = new Date(transactions[transactions.length - 1]?.date);
    const differenceMs = date1 - date2;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));


    const popMenu = () => {
        setMenuShow(!menuShow)
    }
    const popFilters = () => {
        setShowFilters(!showFilters)
    }

    async function getWallet() {
        let wallet = await getWalletData()
        setWalletData(wallet)
    }

    async function getTransactionsData() {
        const data = await getTransactions()
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
                <div className='graph'>
                    <div className='available-bal'>
                        <span className='available-amt'><p style={{ fontSize: "12px", color: '#56616B' }}>Available Balance</p><p style={{ fontSize: "24px", fontWeight: 700, color: "#131316", lineHeight: '50px' }}>USD 120,500.00</p></span>
                        <button className='apply-btn' style={{ marginTop: '5px' }}>Withdrawal</button>
                    </div>
                    <Chart transactions={transactions} />
                </div>
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
                    <p className='big-font'>{transactions.length} Transactions</p>
                    <p className='small-font'>Your transactions for thr last {differenceDays} days</p>
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
                        const metaData = transactData?.metadata;
                        console.log(metaData)
                        return <User transactData={transactData} metaData={metaData} key={i} />;
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard

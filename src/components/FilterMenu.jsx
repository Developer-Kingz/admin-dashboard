import React, { useEffect, useState } from 'react';
import cancel from "../assets/32px icon button.svg";
// import DatePicker from 'react-date-picker';
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox, FormControl, ListItemIcon, ListItemText, MenuItem, Select } from '@mui/material';
// import expand from "../assets/expand_more.svg";
// import Select from "react-dropdown-select";

const FilterMenu = ({ setShowFilters, showFilters }) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [value, setValue] = useState([])
    const [statusValue, setStatusValue] = useState([])
    const [selectLable, setSelectLable] = useState([])
    const [statusSelectLabel, setStatusSelectLable] = useState([])
    console.log(value)

    const Options = [
        { id: 1, label: "Store Transactions", value: "Store Transactions" },
        { id: 2, label: "Get Tipped", value: "Get Tipped" },
        { id: 3, label: "Withdrawers", value: "Withdrawers" },
        { id: 4, label: "Chargebacks", value: "Chargebacks" },
        { id: 5, label: "Cashbacks", value: "Cashbacks" },
        { id: 6, label: "Refer and Earn", value: "Refer and Earn" },
    ]
    const statusOptions = [
        { id: 1, label: "Successful", value: "Successful" },
        { id: 2, label: "Pending", value: "Pending" },
        { id: 3, label: "Failed", value: "Failed" },
    ]

    const OptionsValue = Options.map((item) => item.value)
    const OptionsStatusValue = statusOptions.map((item) => item.value)
    const OptionsLabel = Options.map((item) => item.label)
    const OptionsStatusLabel = statusOptions.map((item) => item.label)
    const isAllSelected = Options.length > 0 && value.length === Options.length
    const isAllStatusSelected = statusOptions.length > 0 && statusValue.length === statusOptions.length

    const handleChange = (e) => {
        const selectedValue = e.target.value
        console.log(selectedValue)
        if (selectedValue.includes("all")) {
            setValue((value && value.length) === (Options && Options.length) ? [] : OptionsValue)
            setSelectLable((value && value.length) === (Options && Options.length) ? [] : OptionsLabel)
            return
        }
        setValue(selectedValue)
        setSelectLable(selectedValue.map((optionValue) => {
            const option = Options.find((i) => i.value === optionValue)
            return option ? option.label : ""
        }))
    }

    const handleStatusChange = (e) => {
        const selectedValue = e.target.value
        console.log(selectedValue)
        if (selectedValue.includes("all")) {
            setStatusValue((statusValue && statusValue.length) === (statusOptions && statusOptions.length) ? [] : OptionsStatusValue)
            setStatusSelectLable((statusValue && statusValue.length) === (statusOptions && statusOptions.length) ? [] : OptionsStatusLabel)
            return
        }
        setStatusValue(selectedValue)
        setStatusSelectLable(selectedValue.map((optionValue) => {
            const option = statusOptions.find((i) => i.value === optionValue)
            return option ? option.label : ""
        }))
    }

    // useEffect(() => {
    //     if (Array.isArray(selectLable) && selectLable.length > 0) {
    //         document.querySelector('#multi-select').innerHTML = selectLable.join(", ");
    //     } else if (!Array.isArray(selectLable)) {
    //         document.querySelector('#multi-select').innerHTML = selectLable;
    //     } else {
    //         document.querySelector('#multi-select').innerHTML = "";
    //     }
    // }, [selectLable])

    return (
        <div className='filter-backdrop' onClick={() => setShowFilters(false)}>
            <div className="filter-cont">
                <div className='filter-header'>
                    <p>Filter</p>
                    <img src={cancel} alt="" style={{ width: "34px", cursor: "pointer" }} onClick={() => setShowFilters(false)} />
                </div>
                <div className='filter-btns'>
                    <button className='filt-button'>Today</button>
                    <button className='filt-button'>Last 7 days</button>
                    <button className='filt-button'>This month</button>
                    <button className='filt-button'>Last 3 months</button>
                </div>
                <div className='date-range'>
                    <span><p>Date Range</p></span>
                    <div className='range-inner'>
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            formatDate="dd MM yyyy"
                            customInput={<input className="datepicker" />}
                        />
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            formatDate="dd MM yyyy"
                            customInput={<input className="datepicker" />}
                        />
                    </div>
                </div>
                <div className='transacton-type'>
                    <p>Transaction Type</p>
                    <FormControl sx={{ width: "100%" }}>
                        <Select
                            value={value}
                            multiple
                            id="multi-select"
                            className='multi-select-dropdown'
                            onChange={handleChange}
                            renderValue={(selected) => selected.join(" ")}
                        >
                            <MenuItem value="all">
                                <ListItemIcon>
                                    <Checkbox checked={isAllSelected}></Checkbox>
                                </ListItemIcon>
                                <ListItemText primary="Select All"></ListItemText>
                            </MenuItem>
                            {
                                Options.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        <ListItemIcon>
                                            <Checkbox name="select-checkbox" checked={value.includes(option.value)}></Checkbox>
                                        </ListItemIcon>
                                        <ListItemText primary={option.label}></ListItemText>
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>

                <div className='transacton-type'>
                    <p>Transaction Status</p>
                    <FormControl sx={{ width: "100%" }}>
                        <Select
                            value={statusValue}
                            multiple
                            id="multi-select"
                            className='multi-select-dropdown'
                            onChange={handleStatusChange}
                            renderValue={(selected) => selected.join(" ")}
                        >
                            <MenuItem value="all">
                                <ListItemIcon>
                                    <Checkbox checked={isAllStatusSelected}></Checkbox>
                                </ListItemIcon>
                                <ListItemText primary="Select All"></ListItemText>
                            </MenuItem>
                            {
                                statusOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        <ListItemIcon>
                                            <Checkbox name="select-checkbox" checked={statusValue.includes(option.value)}></Checkbox>
                                        </ListItemIcon>
                                        <ListItemText primary={option.label}></ListItemText>
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className='filter-footer'>
                    <button className='clear-btn'>Clear</button>
                    <button className='apply-btn'>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default FilterMenu

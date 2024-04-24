import React, { useEffect, useState } from 'react';
import cancel from "../assets/32px icon button.svg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox, FormControl, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import clsx from 'clsx';


const FilterMenu = ({ setShowFilters, showFilters }) => {
    const [selectedDate, setSelectedDate] = useState()
    const [secondSelectedDate, setSecondSelectedDate] = useState()
    const [value, setValue] = useState([])
    const [statusValue, setStatusValue] = useState([])
    const [selectLable, setSelectLable] = useState([])
    const [statusSelectLabel, setStatusSelectLable] = useState([])
    const [isFormFilled, setIsFormFilled] = useState(false);

    useEffect(() => {
        const formFilled = selectedDate !== null && secondSelectedDate !== null && value.length > 0 && statusValue.length > 0;
        setIsFormFilled(formFilled);
    }, [selectedDate, secondSelectedDate, value, statusValue]);

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

    return (
        <div className='filter-backdrop' >
            <div className="filter-cont">
                <div className='filter-header'>
                    <p style={{ color: "#131316", fontWeight: 700 }}>Filter</p>
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
                            customInput={<input className={clsx("datepicker", {
                                "datepicker-clicked": selectedDate,
                            })} />}
                        />
                        <DatePicker
                            selected={secondSelectedDate}
                            onChange={date => setSecondSelectedDate(date)}
                            formatDate="dd MM yyyy"
                            customInput={<input className={clsx("datepicker", {
                                "datepicker-clicked": secondSelectedDate,
                            })} />}
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
                            className={clsx('multi-select-dropdown', {
                                'multi-select-dropdown-clicked': value.length > 0,
                            })}
                            onChange={handleChange}
                            renderValue={(selected) => selected.join(" ")}
                        >
                            <MenuItem value="all">
                                <ListItemIcon>
                                    <Checkbox style={{ color: 'black' }} checked={isAllSelected}></Checkbox>
                                </ListItemIcon>
                                <ListItemText primary="Select All"></ListItemText>
                            </MenuItem>
                            {
                                Options.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        <ListItemIcon>
                                            <Checkbox style={{ color: 'black' }} name="select-checkbox" checked={value.includes(option.value)}></Checkbox>
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
                            className={clsx('multi-select-dropdown', {
                                'multi-select-dropdown-clicked': statusValue.length > 0,
                            })}
                            onChange={handleStatusChange}
                            renderValue={(selected) => selected.join(" ")}
                        >
                            <MenuItem value="all">
                                <ListItemIcon>
                                    <Checkbox style={{ color: 'black' }} checked={isAllStatusSelected}></Checkbox>
                                </ListItemIcon>
                                <ListItemText primary="Select All"></ListItemText>
                            </MenuItem>
                            {
                                statusOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        <ListItemIcon>
                                            <Checkbox style={{ color: 'black' }} name="select-checkbox" checked={statusValue.includes(option.value)}></Checkbox>
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
                    <button className={clsx("apply-btn", {
                        "apply-btn-disabled": !isFormFilled,
                    })} disabled={!isFormFilled}>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default FilterMenu

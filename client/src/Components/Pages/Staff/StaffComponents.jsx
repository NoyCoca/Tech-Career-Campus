import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaff } from '../../../Redux/actions/staffAction';
import AddStaffComponent from '../../Features/AddStaffForm/AddStaffComponent';
import { hebrewVariables } from '../../../utils/hebrewVariables';
import StaffCard from '../../Features/StaffCard/StaffCard';


const StaffComponents = () => {

    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const dispatch = useDispatch();
    const staff = useSelector((state) => state.staff.staff);

    useEffect(() => dispatch(getStaff()), []);

    return (
        <div >
            <h1>הצוות שלנו</h1>
            <div style={{backgroundColor:"#E5E9F0"}}>
                {
                    open ? <AddStaffComponent open={open} handleClose={() => setOpen(!open)} /> : ""
                }

                <button className='btn' onClick={() => setOpen(!open)}>
                    {hebrewVariables.addStuff}
                </button>
                <div className='staff-card-container' >
                {staff?.map((staffItem) => (
                    <div key={staffItem._id}>
                        <StaffCard staffItem={staffItem} isEdit={isEdit} setIsEdit={() => setIsEdit(!isEdit)} />
                    </div>
                ))}
                 </div>
            </div>
        </div >
    )
}

export default StaffComponents

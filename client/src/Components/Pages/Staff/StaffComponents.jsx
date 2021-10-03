import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaff } from '../../../Redux/actions/staffAction';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddStaffComponent from '../../Features/AddStaffForm/AddStaffComponent';
import { hebrewVariables } from '../../../utils/hebrewVariables';
import StaffCard from '../../Features/StaffCard/StaffCard';






const StaffComponents = () => {

    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const dispatch = useDispatch();
    const staff = useSelector((state) => state.staff.staff);

    useEffect(() => dispatch(getStaff()), [staff]);

    return (
        <div className="body-staff">
            <h1>הצוות שלנו</h1>
            <Paper>
                {
                    open ? <AddStaffComponent open={open} handleClose={() => setOpen(!open)} /> : ""
                }

                <Button variant="contained" onClick={() => setOpen(!open)}>
                    {hebrewVariables.addStuff}
                </Button>

                {staff?.map((staffItem) => (
                    <div key={staffItem._id}>
                        <StaffCard staffItem={staffItem} isEdit={isEdit} setIsEdit={() => setIsEdit(!isEdit)} />
                    </div>
                ))}
            </Paper>
        </div >
    )
}

export default StaffComponents

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addStuff } from '../../../Redux/actions/staffAction';
import { hebrewVariables } from '../../../utils/hebrewVariables';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';




const AddStaffComponent = ({ open, handleClose }) => {
    const [staffUser, setStaffUser] = useState({ registeredAs: "Staff" })
    const [isRegister, setIsRegister] = useState(false);
    const [img, setImg] = useState(null)

    const dispatch = useDispatch();
    const { errors } = useSelector((state) => state.staff);
    const staff = useSelector((state) => state.staff.staff);

    const createStaff = (e) => {
        setStaffUser({
            ...staffUser,
            [e.target.name]: e.target.value
        })
    }

    const handleRegisterWindow = () => {

        setIsRegister(!isRegister)

    }

    const addStaff = () => {

        dispatch(addStuff(staffUser));
        if (checkErrors()) {

            handleRegisterWindow()
        }
    }

    const checkErrors = () => {
        return Object.keys(errors).length === 0;
    }


    const Input = styled('input')({
        display: 'none',
    });

    const image = new FormData();
    image.append('profileImg', img)

    return (
        <div>
            <Dialog aria-labelledby="form-dialog-title" open={open}  >
                <DialogTitle id="form-dialog-title"> {hebrewVariables.createStaff}
                    {
                        isRegister && checkErrors() ? <>
                            <Alert severity="success">{`${staff[staff.length - 1]?.firstName} ${staff[staff.length - 1]?.lastName} ${hebrewVariables.registerd}`}</Alert>
                            <Button color="primary" onClick={() => handleRegisterWindow()}>
                                סגור
                            </Button>
                        </>
                            :
                            ""
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {hebrewVariables.fillDetails}
                    </DialogContentText>
                    <TextField
                        name="firstName"
                        autoFocus
                        margin="dense"
                        id="name"
                        label={hebrewVariables.firstName}
                        type="text"
                        fullWidth
                        onChange={(e) => createStaff(e)}
                        value={staffUser.firstName}

                    />
                    <strong className="errors">{errors?.firstName ? errors.firstName : ""}</strong>
                    <TextField
                        name="lastName"
                        margin="dense"
                        id="name"
                        label={hebrewVariables.lastName}
                        type="text"
                        fullWidth
                        onChange={(e) => createStaff(e)}
                        value={staffUser.lastName}

                    />
                    <strong className="errors">{errors?.lastName ? errors.lastName : ""}</strong>
                    <TextField
                        name="email"
                        margin="dense"
                        id="name"
                        label={hebrewVariables.email}
                        type="email"
                        fullWidth
                        onChange={(e) => createStaff(e)}
                        value={staffUser.email}

                    />
                    <strong className="errors">{errors?.email ? errors.email : ""}</strong>
                    <TextField
                        name="password"
                        margin="dense"
                        id="name"
                        label={hebrewVariables.password}
                        type="password"
                        fullWidth
                        onChange={(e) => createStaff(e)}
                        value={staffUser.password}

                    />
                    <strong className="errors">{errors?.password ? errors.password : ""}</strong>
                    <TextField
                        name="phone"
                        margin="dense"
                        id="name"
                        label={hebrewVariables.phone}
                        type="phone"
                        fullWidth
                        onChange={(e) => createStaff(e)}
                        value={staffUser.phone}

                    />
                    <strong className="errors">{errors?.phone ? errors.phone : ""}</strong>
                    <TextField
                        name="age"
                        margin="dense"
                        id="name"
                        label={hebrewVariables.age}
                        type="number"
                        fullWidth
                        onChange={(e) => createStaff(e)}
                        value={staffUser.age}

                    />
                    <strong className="errors">{errors?.age ? errors.age : ""}</strong>
                    <TextField
                        name="jod"
                        margin="dense"
                        id="name"
                        label={hebrewVariables.job}
                        type="text"
                        fullWidth
                        onChange={(e) => createStaff(e)}
                        value={staffUser.jod}

                    />
                    <TextField
                        name="responsible"
                        margin="dense"
                        id="name"
                        label={hebrewVariables.responsibleFor}
                        type="text"
                        fullWidth
                        onChange={(e) => createStaff(e)}
                        value={staffUser.responsible}

                    />

                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <Input accept="image/*" id="icon-button-file" name="profileImg" type="file"
                            onChange={e => {
                                setImg(e.target.files[0])
                                console.log(img);
                            }} />
                        בחר תמונת פרופיל
                        <PhotoCamera />
                    </IconButton>

                </DialogContent>

                <DialogActions>
                    <Button color="primary" onClick={(e) => addStaff(e)}>
                        {hebrewVariables.createStuffBtn}
                    </Button>
                    <Button onClick={() => handleClose()}>
                        {hebrewVariables.closeBtn}
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}

export default AddStaffComponent

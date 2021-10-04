import React from 'react'
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@material-ui/core';
import {deleteStaff} from '../../../Redux/actions/staffAction'
import {hebrewVariables} from '../../../utils/hebrewVariables'

const ConfirmDialog = ({ dialogOpen, setDialogOpen, staff }) => {
  const dispatch = useDispatch();

  const deleteUser = () => {
    dispatch(deleteStaff(staff._id))
    setDialogOpen(!dialogOpen)

  }

  return (
    <Dialog open={dialogOpen} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm the action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
      </Box>
      <DialogContent>
        <Typography>{hebrewVariables.confirmDelete} {staff.firstName} {staff.lastName} </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setDialogOpen(!dialogOpen)} >
          {hebrewVariables.closeBtn}
        </Button>
        <Button color="primary" variant="contained"
          onClick={() => deleteUser()} >
          {hebrewVariables.delete}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
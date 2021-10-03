import { SET_USER, SET_USER_ERRORS, UPDATE_USER } from './types';
import jwt_decode from "jwt-decode";
import fetcher from '../../utils/fetcher';
import checkToken from '../../utils/currentTime ';

export const getUser = (loginInfo) => async dispatch => {
    try {
        if (!localStorage.jwtToken) {
            await fetch("/api/login", {
                method: 'POST',
                body: JSON.stringify({
                    role: loginInfo.role,
                    email: loginInfo.email,
                    password: loginInfo.password,
                }), headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json())
                .then((response) => {
                    if (!response.data) throw response
                    return response
                })
                .then((response) => localStorage.setItem("jwtToken", response.data))
                .catch(err => { throw err })
        }

        const token = localStorage.getItem("jwtToken")
        const decoded = jwt_decode(token);
        checkToken(decoded);

        return dispatch({
            type: SET_USER,
            payload: decoded
        })
    }
    catch (error) {
        dispatch({
            type: SET_USER_ERRORS,
            payload: error.errors
        })
    }
}

export const updateUser = (updateData, file) => async dispatch => {
    const { _id } = { ...updateData };
    const basicStaff = '/api/staff/update/'
    const basicStudent = '/api/student/updateStudent/'

    const studentUpdate = new FormData()
    studentUpdate.append('profileImg', file || updateData.profileImg )
    studentUpdate.append('_id', updateData._id || "")
    studentUpdate.append('firstName', updateData.firstName || "")
    studentUpdate.append('lastName', updateData.lastName || "")
    studentUpdate.append('email', updateData.email || "")
    studentUpdate.append('password', updateData.password || "")
    studentUpdate.append('phone', updateData.phone || "")
    studentUpdate.append('role', updateData.role || "")

    
    await fetch(`${updateData.role === 'Staff' ? basicStaff : basicStudent}${_id}`, {

        method: 'PUT',
        body: studentUpdate,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    })
        .then((res) => res.json())
        .then((response) => localStorage.setItem("jwtToken", response.result))
        
    const token = localStorage.getItem("jwtToken")
    const decoded = jwt_decode(token);
    return dispatch({
        type: UPDATE_USER,
        payload: decoded
    })

}
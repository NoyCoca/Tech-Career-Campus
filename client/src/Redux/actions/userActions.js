import { SET_USER, SET_USER_ERRORS, UPDATE_USER } from './types';
import jwt_decode from "jwt-decode";
import fetcher from '../../utils/fetcher';
import checkToken from '../../utils/currentTime ';

export const getUser = (loginInfo) => async dispatch => {
    try {
        debugger
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
                    if (!response.result) throw response
                    return response
                })
                .then((response) => localStorage.setItem("jwtToken", response.result))
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

export const updateUser = (updateData) => async dispatch => {
    const { _id } = { ...updateData };
    const basicStaff = `http://localhost:8080/api/staff/`
    const basicStudent = `http://localhost:8080/api/student/updateStudent/`
    await fetcher(`${updateData.role === 'Staff' ? basicStaff : basicStudent}${_id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
    })
        .then((response) => localStorage.setItem("jwtToken", response.result))

    const token = localStorage.getItem("jwtToken")
    const decoded = jwt_decode(token);
    return dispatch({
        type: UPDATE_USER,
        payload: decoded
    })

}
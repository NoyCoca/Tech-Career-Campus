import { SET_USER } from './types';
import jwt_decode from "jwt-decode";

export const getUser = (loginInfo) => async dispatch => {
    try {
        if (!localStorage.jwtToken) {
            await fetch("http://localhost:8080/api/login", {
                method: 'POST',
                body: JSON.stringify({
                    role: loginInfo.role,
                    email: loginInfo.email,
                    password: loginInfo.password,
                }),
                headers: { "Content-Type": "application/json"}
            })
                .then((res) => {
                    if (!res.ok) throw res.json()
                    return res.json()
                })
                .then((res) => localStorage.setItem("jwtToken", res.result))
                .catch(err=>{throw err})
        }
        const token = localStorage.getItem("jwtToken")
        const decoded = jwt_decode(token);
        return dispatch({
            type: SET_USER,
            payload: { ...decoded, isConnected: true }
        })
    }
    catch (error) {
        console.log(error)
        error.then(error => dispatch({
            type: SET_USER,
            payload: { isConnected: false, ...error }
        })
        )
    }
}
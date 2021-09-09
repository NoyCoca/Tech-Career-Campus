import { GET_STAFF_LIST, ADD_STAFF, DELETE_STAFF } from "./types";
import fetcher from "../../utils/fetcher";

export const getStaff = () => async dispatch => {

    await fetcher('http://localhost:8080/api/staff')
        .then((response) => dispatch({
            type: GET_STAFF_LIST,
            payload: response.data,
        }
        ))
        .catch((err) => console.log(err));
}

export const addStuff = (staff) => async dispatch => {

    try {
        await fetcher('http://localhost:8080/api/register', {
            method: 'POST',
            body: JSON.stringify({
                registeredAs: staff.registeredAs,
                firstName: staff.firstName,
                lastName: staff.lastName,
                email: staff.email,
                phone: staff.phone,
                password: staff.password,
                age: staff.age
            }),
        })
            .then((response) => dispatch({
                type: ADD_STAFF,
                payload: response.data,
            }
            ))
            .catch(error => { throw error })
    }
    catch (error) {
        console.log(error);
    }

}
export const deleteStaff = (staffId) => async dispatch => {

    try {
        await fetcher('http://localhost:8080/api/staff', {
            method: 'DELETE',
            body: JSON.stringify({
                id: staffId
            }),
        })
            .then((response) => dispatch({
                type: DELETE_STAFF,
                payload: response.data,
            }
            ))
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }

}

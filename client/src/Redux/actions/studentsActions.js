import fetcher from '../../utils/fetcher';
import { GET_STUDENTS } from './types'
export const getStudents = () => async dispatch => {

    await fetcher("http://localhost:8080/api/student")
        .then((response) => dispatch({
            type: GET_STUDENTS,
            payload: response.data,
        }))
        .catch((err) => console.log(err));
}
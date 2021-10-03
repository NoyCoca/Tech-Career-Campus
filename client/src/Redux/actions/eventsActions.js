import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, GET_EVENTS } from './types';
import fetcher from '../../utils/fetcher';

export const getEvents = () => async dispatch => {
    await fetcher("/api/event")
        .then((response) => dispatch({
            type: GET_EVENTS,
            payload: response.data
        }))
        .catch(err => { console.error("GET ALL FAIL") });
}

export const createEvent = (event) => async dispatch => {
    try {
        await fetcher(`/api/event/${event.userId}`, {
            method: 'POST',
            body: JSON.stringify({
                eventName: event.eventName,
                message: event.message
            }),
        })
            .then((response) => dispatch({
                type: CREATE_EVENT,
                payload: response.data
            }))
            .catch(err => { console.error(err); });
    }
    catch (error) {
        console.log(error);
    }
}

export const updateEvent = (eventUpdate) => async dispatch => {
    try {
        await fetcher(`/api/event/${eventUpdate.eventId}`, {
            method: 'PUT',
            body: JSON.stringify({
                eventName: eventUpdate.eventName,
                message: eventUpdate.message
            }),
        })
            .then(response => dispatch({
                type: UPDATE_EVENT,
                payload: response.data
            }))
            .catch(err => { console.error(err); });
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteEvent = (deleteId) => async dispatch => {
    try {
            await fetcher(`/api/event/${deleteId}`, {
                method: 'DELETE',
            })
                .then(response => dispatch({
                    type: DELETE_EVENT,
                    payload: response.data
                }))
                .catch(error => { console.log(error); })
        }
        catch (error) {
            console.log(error);
        }
    }


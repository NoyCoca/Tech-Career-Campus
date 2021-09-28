import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, GET_EVENTS } from '../actions/types';

function eventsReducer(events = [], action) {
    switch (action.type) {
        case GET_EVENTS:
            return action.payload
        case CREATE_EVENT:
            return [...events, action.payload]
        case UPDATE_EVENT:
            return events.map((event) => event._id !== action.payload._id ? event : action.payload)
        case DELETE_EVENT:
            return events.filter((event) => event._id !== action.payload._id)
        default:
            return events;
    }
}
export default eventsReducer;

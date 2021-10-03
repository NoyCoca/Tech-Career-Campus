import React, { useEffect } from 'react';
import "./Events.css";
import { useState } from 'react';
import { getEvents, updateEvent, deleteEvent } from '../../../Redux/actions/eventsActions';
import { useDispatch, useSelector } from 'react-redux';
// import { FaPlus } from 'react-icons/fa';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { hebrewVariables } from '../../../utils/hebrewVariables';
import FormEvent from './FormEventComponent';

const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events);
    const {user} = useSelector(state => state.user)

    const [isForm, setForm] = useState(false)
    const [isUpdate, setUpdate] = useState(false)

    const [eventUpdate, setEventUpdate] = useState({
        eventId: "",
        eventName: "",
        message: "",
    });

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    const handelChange1 = (e) => {
        setEventUpdate(
            {
                ...eventUpdate,
                [e.target.name]: e.target.value
            }
        )
    }

    return (
        <div className="Body">
            <div className="titel-event">
                <div className="updete">
                    <p> {hebrewVariables.eventsHeadline} </p>
                </div>
                {
                    user.role === "Staff" ?
                        <div className="bth-add">
                            <button onClick={() => { setForm(isForm ? false : true); }}> <ControlPointIcon /> </button>
                        </div>
                        : ""
                }
            </div>

            <div className="body-updete">
                {
                    isForm ?
                        <FormEvent user={user} />
                        : ""
                }
                {
                    events?.map((event) => {
                        return (
                            <div className="EventsNews" key={event._id} >
                                <div key={event._id} >

                                    <div className="inputs-massage">
                                        {hebrewVariables.eventNameTitle}: {event.eventName}
                                        <br></br>
                                        {hebrewVariables.eventMessageTitle}: {event.message}
                                        <br></br>
                                        {hebrewVariables.createBy}: {event.createBy}
                                    </div>

                                    <div className="bth-e">
                                        {
                                            user.role === "Staff" ?
                                                <>
                                                    <button onClick={() => { setUpdate(isUpdate ? false : true); setEventUpdate({ ...eventUpdate, eventId: event._id }) }}> {hebrewVariables.update} </button>
                                                    {
                                                        isUpdate && event._id === eventUpdate.eventId ?
                                                            <div>
                                                                <input type="text" name="eventName" value={eventUpdate.eventName} onChange={(e) => { handelChange1(e) }} />
                                                                <textarea cols="100" rows="0.5" name="message" value={eventUpdate.message} onChange={(e) => { handelChange1(e) }}></textarea>
                                                                <input type="button" id="confirmUpdates" value={hebrewVariables.confirmUpdates} onClick={() => { dispatch(updateEvent(eventUpdate)); setUpdate(false) }} />
                                                            </div> : ""
                                                    }
                                                    <button id="deleteBtn" onClick={() => dispatch(deleteEvent(event._id))}> {hebrewVariables.delete}</button>
                                                </> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Events;
import React, { useEffect } from 'react';
import "./Events.css";
import { useState } from 'react';
import { getEvents, updateEvent, deleteEvent } from '../../../Redux/actions/eventsActions';
import { useDispatch, useSelector } from 'react-redux';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { hebrewVariables } from '../../../utils/hebrewVariables';
import FormEvent from './FormEventComponent';

const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events);
    const { user } = useSelector(state => state.user)

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
            <div className="title-event">
                <div className="update">
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

            <div className="body-update">
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
                                                    {
                                                        isUpdate && event._id === eventUpdate.eventId ?
                                                            <div className="textarea-div-event-continer">
                                                                <textarea cols="15" type="text" name="eventName" className="input-textarea" value={eventUpdate.eventName} onChange={(e) => { handelChange1(e) }}></textarea>
                                                                <textarea cols="15" rows="0.5" name="message" className="input-textarea" value={eventUpdate.message} onChange={(e) => { handelChange1(e) }}></textarea>

                                                                {isUpdate && <input type="button" id="confirmUpdates" value={hebrewVariables.confirmUpdates} onClick={() => { dispatch(updateEvent(eventUpdate)); setUpdate(false) }} />}
                                                            </div> : ""
                                                    }
                                                    {
                                                        isUpdate === false ?
                                                        <div className="button-div-event">
                                                            <button className="btnUpdate" onClick={() => { setUpdate(isUpdate ? false : true); setEventUpdate({ ...eventUpdate, eventId: event._id }) }}> {hebrewVariables.update} </button>
                                                            <button id="deleteBtn" onClick={() => dispatch(deleteEvent(event._id))}> {hebrewVariables.delete}</button>
                                                        </div>
                                                        :""
                                                    }
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
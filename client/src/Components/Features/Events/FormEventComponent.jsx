import React from "react";
import { useDispatch } from "react-redux";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import { createEvent } from "../../../Redux/actions/eventsActions";
import { useState } from "react";

const FormEvent = ({ user }) => {
    const dispatch = useDispatch();
    const [newEvent, setNewEvent] = useState({
        eventName: "",
        massage: ""
    });

    const hendleChange = (e) => {
        setNewEvent(
            {
                ...newEvent, userId: user._id,
                [e.target.name]: e.target.value
            }
        )
    }
    return (
        <div className="form-event">
            <form onSubmit={(e) => { e.preventDefault() }}>
                <input type="text" name="eventName" id="eventName" value={newEvent.eventName} placeholder={hebrewVariables.eventNamePlaceholder} onChange={(e) => { hendleChange(e) }} />
                <br></br>
                <br></br>
                <textarea name="massage" id="massage" cols="100" rows="10" value={newEvent.massage} placeholder={hebrewVariables.eventMassagePlaceholder} onChange={(e) => { hendleChange(e) }}></textarea>
                <br />
                <div className="bth-send-event">
                    <button type="submit" onClick={() => { dispatch(createEvent(newEvent)) }} > {hebrewVariables.send} </button>
                </div>
            </form>
        </div>
    )
}
export default FormEvent;
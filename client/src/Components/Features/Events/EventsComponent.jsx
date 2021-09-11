import React, { useEffect } from 'react';
import { useState } from 'react';
import Popup from 'reactjs-popup';

const Events = () => {
    const token = localStorage.getItem("jwtToken");
    const defaultHeaders = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }

    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        eventName: "",
        massage: ""
    });;

    const [eventUpdate, setEventUpdate] = useState({
        eventName: "",
        massage: "",
    });

    const optionPOST = {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers: defaultHeaders,
    }

    const optionPUT = {
        method: 'PUT',
        body: JSON.stringify(eventUpdate),
        headers: defaultHeaders,
    }

    const optionDELETE = {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: defaultHeaders,
    }

    useEffect( () => {
        getDat();
    }, [])

    const getDat = async () => {
       await fetch("http://localhost:8080/api/event", { headers: defaultHeaders })
            .then((res) => res.json())
            .then((response) => setEvents(response.data))
            .catch(err => { console.error("GET ALL FAIL") });
    }

    const sendEvent = async () => {
        await fetch("http://localhost:8080/api/event", optionPOST)
            .then((res) => res.json())
            .then((res) => { setEvents([...events, ...res.data]); })
            .catch(err => { console.error("GET ALL NOT SAND"); });
    }

    const updateEvent = async (_id) => {
       await fetch(`http://localhost:8080/api/event/${_id}`, optionPUT)
            .then((res) => res.json())
            .then((res) => (res.data))
            .catch((err) => { console.log(err); })
        getDat();
        setEventUpdate({
            eventName: "",
            massage: "",
        })
        }

    const deleteEvent = async (_id) => {
        if (window.confirm('are you sure?')) {
            await fetch(`http://localhost:8080/api/event/${_id}`, optionDELETE)
                .then((res) => res.json())
                .then((res) => (res.data))
                .catch((err) => { console.log(err); })
            getDat();
        }
    }

    const hendleChangeNewEvent = (e) => {
        setNewEvent(
            {
                ...newEvent,
                [e.target.name]: e.target.value
            }
        )
    }

    const hendleChangeEventUpdate = (e) => {
        setEventUpdate(
            {
                ...eventUpdate,
                [e.target.name]: e.target.value
            }
        )
    }

    const handlePopupValue = (event) => {
        const currentEvent = event._id ?events.find((e) => e._id === event._id) : null
           setEventUpdate({
               eventName: currentEvent.eventName,
               massage: currentEvent.massage,
           })
       }
    return (
        <div>
            <input type="button" id="sendBtn" value="שלח" onClick={sendEvent} />
            <br></br>
            <textarea name="eventName" id="eventName" cols="100" rows="0.5" value={newEvent.eventName} placeholder="שם האירוע" onChange={(e) => { hendleChangeNewEvent(e) }}></textarea>
            <br></br>
            <textarea name="massage" id="massage" cols="100" rows="10" value={newEvent.massage} placeholder="הקלד כאן" onChange={(e) => { hendleChangeNewEvent(e) }}></textarea>
            {
                events?.map((event, index) => {
                    return (
                        <span key={event._id}>
                            שם הארוע :{event.eventName}
                            <br></br>
                            הודעה :{event.massage}
                            <br></br>
                            <Popup onOpen={()=>handlePopupValue(event)} trigger={<input type="button" id="updateBtn" value="עדכן" />} position="right center">
                                <div>
                                    <textarea cols="100" rows="0.5" name="eventName" id="some" value={eventUpdate.eventName} onChange={(e) => { hendleChangeEventUpdate(e) }}></textarea>
                                    <br></br>
                                    <textarea cols="100" rows="0.5" name="massage" value={eventUpdate.massage} onChange={(e) => { hendleChangeEventUpdate(e) }}></textarea>
                                    <br></br>
                                    <input  type="button" id="confirmUpdates" value="אישור עדכונים" onClick={() =>  updateEvent(event._id) } />
                                </div>
                            </Popup>
                            <input type="button" id="deleteBtn" value="מחק" onClick={() => { deleteEvent(event._id) }} />
                            <hr></hr>
                        </span>
                    )
                })
            }
        </div>
    )
}
export default Events;
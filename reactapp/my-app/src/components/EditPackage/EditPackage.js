import React, {useState,useEffect} from 'react';
import axios from 'axios'
import './EditPackage.css'
import { Link, useLocation } from 'react-router-dom';

export default function EditPackage ({token})
{
    const [location_name, setLocationName] = useState()
    const [destination_name, setDestinationName] = useState();
    const [distance, setDistance] = useState();
    const [timeslot, setTimeslot] = useState();
    const [date, setDate] = useState();
    const [reference, setReference] = useState();

    const location = useLocation();
    const {data} = location.state;
    //console.log(JSON.stringify(data))


    useEffect(()=>{

        const {
            location_name,
            destination_name,
            distance,
            timeslot,
            date,
            reference
        } = data;
        setLocationName(location_name);
        setDestinationName(destination_name);
        setDistance(distance);
        setTimeslot(timeslot);
        setDate(date);
        setReference(reference);
    })


    
    const locationChanged = (location_name) =>{
        setLocationName(location_name);
    }

    const destinationChanged = (destination_name)=>{
        setDestinationName(destination_name);
    }

    const distanceChanged = (distance) =>{
        setDistance(distance);
    }

    const timeChanged = (timeslot) =>
    {
        setTimeslot(timeslot);
    }

    const dateChanged = (date) =>
    {
        setDate(date);
    }

    const referenceChanged = (reference) =>
    {
        setReference(reference);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        editUserPackage();
    }

    const editUserPackage = async()=> {

        await axios.put(
            'http://localhost:3000/api/v1/packages',
            {
                location_name,
                destination_name,
                distance,
                timeslot,
                date,
                reference
            },
            {
                headers: {
                  'Authorization': `${token}` 
                }
            }
        )
        .then(response => {
            console.log(response.data);
        })
        .catch(error =>{
            console.log("error editing package");
        })
    }

    return(
      <div className = 'edit-package-wrapper'>
        <h2>Edit Package</h2>
        <form onSubmit = {handleSubmit}>
            <label>
                <p>Location Name</p>
                <input 
                    type="text" 
                    onChange = {e=>locationChanged(e.target.value)}
                    placeholder = {"Enter location"}
                    value = {location_name}
                />
            </label>
            <label>
                <p>Destination Name</p>
                <input 
                    type="text"
                    onChange = {e=>destinationChanged(e.target.value)} 
                    placeholder = {"Enter destination"}
                    value = {destination_name}
                />
            </label>

            <label>
                <p>Distance</p>
                <input 
                    type="number"
                    onChange = {e=>distanceChanged(e.target.value)} 
                    placeholder = {"Enter distance"}
                    value = {distance}
                />
            </label>

            <label>
                <p>Timeslot</p>
                <input 
                    type="time"
                    onChange = {e=>timeChanged(e.target.value)} 
                    //placeholder = {"Enter time"}
                    value = {timeslot}
                />
            </label>

            <label>
                <p>Date</p>
                <input 
                    type="date"
                    onChange = {e=>dateChanged(e.target.value)} 
                    placeholder = {"Enter date"}
                    value = {date}
                />
            </label>

            <label>
                <p>Reference Number</p>
                <input 
                    type="number"
                    onChange = {e=>referenceChanged(e.target.value)} 
                    placeholder = {"Enter Reference"}
                    value = {reference}
                />
            </label>
            <div>
                <button 
                    type="submit"
                >Save Package</button>
            </div>
            <div>
                <Link to = "./home">
                    <button>Cancel</button>
                </Link>
            </div>
        </form>
      </div>
    );
}
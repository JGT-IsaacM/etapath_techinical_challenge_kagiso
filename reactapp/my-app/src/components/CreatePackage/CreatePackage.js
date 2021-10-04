import React from 'react';
import axios from 'axios'
import './CreatePackage.css'

export default class CreatePackage extends React.Component{

    constructor()
    {
        super();
        this.state = {
        location_name: "maseru",
        destination_name: "mazowe",
        distance: 1000,
        timeslot: "",
        date: "",
        reference: 1000
        }
    }

    locationChanged = (location_name) =>{
        this.setState({location_name});
    }

    destinationChanged = (destination_name)=>{
        this.setState({destination_name});
    }

    distanceChanged = (distance) =>{
        this.setState({distance});
    }

    timeChanged = (timeslot) =>
    {
        this.setState({timeslot});
    }

    dateChanged = (date) =>
    {
        this.setState({date});
    }

    referenceChanged = (reference) =>
    {
        this.setState({reference});
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.createUserPackage();
    }

    createUserPackage = async()=> {

        await axios.post(
            'http://localhost:3000/api/v1/packages',
            {
                location_name: this.state.location_name,
                destination_name: this.state.destination_name,
                distance: this.state.distance,
                timeslot:this.state.timeslot,
                date: this.state.date,
                reference: this.state.reference
            },
            {
                headers: {
                  'Authorization': `${this.props.token}` 
                }
            }
        )
        .then(response => {
            console.log(response.data);
        })
        .catch(error =>{
            console.log("error creating package");
        })
    }



  render()
  {
    return(
      <div className = 'create-package-wrapper'>
        <h2>Create Package</h2>
        <form onSubmit = {this.handleSubmit}>
            <label>
                <p>Location Name</p>
                <input 
                    type="text" 
                    onChange = {e=>this.locationChanged(e.target.value)}
                    placeholder = {"Enter location"}
                    value = {this.state.location_name}
                />
            </label>
            <label>
                <p>Destination Name</p>
                <input 
                    type="text"
                    onChange = {e=>this.destinationChanged(e.target.value)} 
                    placeholder = {"Enter destination"}
                    value = {this.state.destination_name}
                />
            </label>

            <label>
                <p>Distance</p>
                <input 
                    type="number"
                    onChange = {e=>this.distanceChanged(e.target.value)} 
                    placeholder = {"Enter distance"}
                    value = {this.state.distance}
                />
            </label>

            <label>
                <p>Timeslot</p>
                <input 
                    type="time"
                    onChange = {e=>this.timeChanged(e.target.value)} 
                    //placeholder = {"Enter time"}
                    value = {this.state.timeslot}
                />
            </label>

            <label>
                <p>Date</p>
                <input 
                    type="date"
                    onChange = {e=>this.dateChanged(e.target.value)} 
                    placeholder = {"Enter date"}
                    value = {this.state.date}
                />
            </label>

            <label>
                <p>Reference Number</p>
                <input 
                    type="number"
                    onChange = {e=>this.referenceChanged(e.target.value)} 
                    placeholder = {"Enter Reference"}
                    value = {this.state.reference}
                />
            </label>
            <div>
                <button 
                    type="submit"
                >Save Package</button>
            </div>
            <div>
                <button 
                    type="submit"
                >Cancel</button>
            </div>
        </form>
      </div>
    );
  }
}
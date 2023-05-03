import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import './Package.css'

export default class Package extends React.Component{

  onDelete = async () =>{   
    try {
      await axios.delete(
        'http://localhost:3000/api/v1/packages',
        {
          data: {...this.props},
          headers: {
            'Authorization': `${this.props.token}` 
          }
        }
      );
    } catch (error) {
      alert('Failed to delete package! Please try again.');
      console.log(error.message);
    }    
  }

  render()
  {
    return(
      <>
        <div className = "package-container">
          <div className = "package-entry">
            <label className = "package-label">Location Name:    </label>
            <input type = "text" disabled = {true} value = {this.props.location_name}/>
          </div>
          <div className = "package-entry">
            <label>Destination Name:    </label>
            <input type = "text" disabled = {true} value = {this.props.destination_name}/>
          </div>
          <div className = "package-entry">
            <label>Distance:    </label>
            <input type = "text" disabled = {true} value = {this.props.distance}/>
          </div>
          <div className = "package-entry">
            <label>Timeslot:   </label>
            <input type = "time" disabled = {true} value = {this.props.timeslot}/>
          </div>
          <div className = "package-entry">
            <label>Date:    </label>
            <input type = "date" disabled = {true} value = {this.props.date}/>
          </div>
          <div className = "package-entry">
            <label>Reference Number:    </label>
            <input type = "text" disabled = {true} value = {this.props.reference}/>
          </div>
          <div className = "package-button-container">
            <Link to = {{
                pathname:"/editPackage",
                state: {
                  data:{
                    id: this.props.id,
                    location_name: this.props.location_name,
                    destination_name: this.props.destination_name,
                    distance: this.props.distance,
                    timeslot: this.props.timeslot,
                    date: this.props.date,
                    reference: this.props.reference
                  }
                }
              }}>
              <button>Edit</button>
            </Link>
            <Link to = "/">
              <button onClick = {this.onDelete}>Delete</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
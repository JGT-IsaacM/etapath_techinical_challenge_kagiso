import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Package from './Package/Package';

export default class Home extends React.Component{

  constructor()
  {
    super();
    this.state = {
      packages:[]
    }
  }

  componentDidMount()
  {
    // get all user's packages
    this.getPackages();
  }

  getPackages = async()=> {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/packages',{
        headers: {
          'Authorization': `${this.props.token}`
        }
      });
      const packages = response.data;
      this.setState({packages});

    } catch (error) {
      alert("Sorry, something went wrong on our side. Please reload page.");
      console.log(error.message);
    }
  }

  render()
  {
    return(
      <>
        <h2>Packages</h2>
        <Link to = "/createPackage">
            <button type="button">
                Create Package
            </button>
        </Link>
        <Link to='/logout'>
          <button type="button">
              Logout 
          </button>
        </Link>
        <div>
            <ul>
                {
                  this.state.packages.map((item, index)=>{
                    return(
                    <Package
                        key = {index}
                        id = {item.id || ''}
                        token = {this.props.token}
                        location_name = {item.location || ''}
                        destination_name = {item.destination || ''}
                        distance = {item.distance || ''}
                        timeslot = {item.timeslot? item.timeslot.split('T')[1].slice(0,8):''}
                        date = {item.date? item.date.slice(0, 10):''}
                        reference = {item.reference_number || ''}
                    />
                    )
                  })
                }
            </ul>
        </div>
      </>
    );
  }
}
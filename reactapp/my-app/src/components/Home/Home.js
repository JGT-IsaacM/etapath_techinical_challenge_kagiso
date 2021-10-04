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
    await axios.get('http://localhost:3000/api/v1/packages')
    .then(response =>{
        console.log(response.data);
        const packages = response.data
        this.setState({packages});

    })
    .catch(error =>{
        console.log("error getting packages");
        console.log(error.message);
    })


  }

  goToCreatePackages()
  {

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
        <div>
            <ul>
                {
                    [1,2,3,4].map((item, index)=>{
                        return(
                        <Package
                            key = {index}
                            location_name = {"mazowe"}
                            destination_name = {"mazowe"}
                            distance = {1000}
                            timeslot = {"13:15"}
                            date = {"2021-06-01"}
                            reference = {"18787382"}
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
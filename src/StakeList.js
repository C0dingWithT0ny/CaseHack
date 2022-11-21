import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState} from "react";
import {supabase} from "./supabase";
import { Link } from "react-router-dom";
import './Home.css'
 
const tableHeaders = ["Name of the Pool", "ETH Staked", "Number of Node Operators", "APR %", "Link to Website"];
 // const array = [["Rocket Pool", "307,040", "1,739", "4.64", "https://rocketpool.net/#header"],
 //     ["StakeWise", "67,488.70", "2,099", "5.28", "https://app.stakewise.io/"]]
 
 let array = [];
 
function StakeList() {
  const getData = async () => {
    try {
        const {data, error} = await supabase
            .from('posts')
            .select('pool_name, eth_staked, nodeoperators, apr, link')
        if (error) {
            throw new Error("Error!")
        }
        else{
        console.log(data)
        return data;
        }
    }
    catch(error) {
        console.log("error");
    }
  }
const loadData = () => {getData().then(param => {
    console.log(param);
    array = param;
    console.log(array);
    array = array.map(Object.values);
  })
}
const [arrowState, setArrowState] = useState("glyphicon glyphicon-triangle-top");
const sort = (index) => {
  if (arrowState === "glyphicon glyphicon-triangle-bottom"){
      loadData();
      console.log(index);
      array.sort((a,b) => a[index].localeCompare(b[index].toUpperCase()));
    setArrowState("glyphicon glyphicon-triangle-top")
  }
  else{
      loadData();
      console.log(index);
      array.sort((a,b) => a[index].localeCompare(b[index].toUpperCase()));
      array.reverse();
    setArrowState("glyphicon glyphicon-triangle-bottom")
  }
}
 
const makeArrow = (index) => {
    if (index !== 4) {
        return <span id={index} className={arrowState} onClick={() => sort(index)}></span>
    }
}
    return (
      <div className="App h-screen">
      {loadData()}
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"></link>
        <br></br>
        <h1 class="text-center my-text-biggest">Stake List</h1>
        <br></br>
      <div class= "text-center">
      <Link to='/'>
      <button class="btn btn-secondary" type="submit">Home</button>
      </Link>
      &nbsp;
      <Link to='/Join'>
      <button class="btn btn-secondary" type="submit">Join</button>
      </Link>
      </div>
        <br></br>
        <br></br>
      <div class = "">
      <table class="styled-table">
        <thead class="styled-table">
          <tr>
          {tableHeaders.map((header, index) => (
            <th class = "th-sm" scope = "col" key={index}>{header}
                {makeArrow(index)}
                </th>
          ))}
          </tr>
 
        </thead>
        <tbody className='styled-table'>
          {array.map(e => (<tr class='color'>{e.map((e, index) => index === 0 ? (<td class='color'scope="row"><b>{e}</b></td>): 
          (index === 4? 
          (<td scope="row"><a href={e}>{e}</a></td>)
          : (<td scope="row">{e}</td>)))}</tr>)
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
 
export default StakeList;

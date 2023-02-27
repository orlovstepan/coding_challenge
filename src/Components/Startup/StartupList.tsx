import { display } from "@mui/system";
import { Fragment, ReactElement, useState, useEffect } from "react";

export default function StartupList(): ReactElement {
  const [startUps, setStartups] = useState([]);

  console.log(startUps);

  useEffect(() => {
    fetch("/api/startups")
  .then((response) => response.json())
  .then(data => setStartups(data));    
  },[])

  const styles = {
    "startup-card": {
      display: "flex",
      "flex-direction": "column",
      "background-color": "white",
      width: "90vw",
      height: "20vh",
      "margin-bottom": "10px",
      "justify-content": "center"
    },
    "startup-card>*":{
      padding: "0px"
    },
    overview: {
    
      display: "flex",
      "font-size": "0.8rem",
      color: "grey"
    },

  } 


  return <Fragment> 
      <ul>
        {startUps.map((startUp : any) => 
        <li className="startup-card" style={styles["startup-card"]}  key={startUp.id}> 
          <h1 className="startup-card--name"> {startUp.name} </h1>  
          <div className="overview" style={styles['overview']}>
            <p> Founded: {new Date(startUp.dateFounded).getFullYear()} | </p>
            <p> {startUp.employees} employees | </p>
            <p> {startUp.totalFunding} $ | </p>
            <p> {startUp.currentInvestmentStage} | </p>
          </div>
          <p className="description"> {startUp.shortDescription}</p>
        </li>)}
      </ul>
     </Fragment>;
}
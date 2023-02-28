import { display } from "@mui/system";
import { Fragment, ReactElement, useState, useEffect } from "react";
import { List, ListItem, ListSubheader, ListItemText, CardHeader, Box } from '@mui/material'

export default function StartupList(): ReactElement {
  const [startUps, setStartups] = useState([]);

  console.log(startUps);

  useEffect(() => {
    fetch("/api/startups")
  .then((response) => response.json())
  .then(data => setStartups(data));    
  },[])

  return <Fragment> 
      <List>
        {startUps.map((startUp : any) => 
        <ListItem alignItems="flex-start" sx={{
          display:"flex",
          flexDirection:"column",
          justifyContent:'center',
          backgroundColor:"white",
          width:"90vw",
          marginBottom:"10px",
          }}
          key={startUp.id}> 
          <CardHeader sx={{padding:"10px 0px 0px 0px"}} title={startUp.name}></CardHeader>  
          <Box sx={{display:"flex", color:"grey"}}>
            <ListSubheader sx={{fontSize:"0.8rem", padding:"0px", marginTop:"-10px", backgroundColor:"transparent"}}> Founded: {new Date(startUp.dateFounded).getFullYear()} | {startUp.employees} employees | {startUp.totalFunding} $ | {startUp.currentInvestmentStage} |  </ListSubheader>
          </Box>
          <ListItemText className="description"> {startUp.shortDescription}</ListItemText>
        </ListItem>)}
      </List>
     </Fragment>;
}
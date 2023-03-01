import { display } from "@mui/system";
import { Fragment, ReactElement, useState, useEffect } from "react";
import { List, ListItem, ListSubheader, ListItemText, CardHeader, Box } from '@mui/material'
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";

export default function StartupList(): ReactElement {
  const [startUps, setStartups] = useState<Startup[]>([]);

  console.log(startUps);

  const styles={
    overview: {
      display:"flex", 
      color:"grey",
      fontSize:"0.8rem",
    },
    "overview--item": {
      padding: "0px",
      marginTop: "-10px",
      backgroundColor: "transparent",
    }
    
  }

  useEffect(() => {
    StartupHttpService.getStartups().then(response => setStartups(response))
    },[])
    

  return <Fragment> 
      <List id="startup-list" >
        {startUps.map((startUp : any) => 
        <ListItem className="MuiGrid-item" sx={{
          display:"flex",
          flexDirection:"column",
          alignItems:"flex-start",
          justifyContent:'center',
          backgroundColor:"white",
          width:"90vw",
          marginBottom:"10px",
          }}
          key={startUp.id}> 
          <CardHeader sx={{padding:"10px 0px 0px 0px"}} title={startUp.name}></CardHeader>  
          <Box className="overview" sx={styles.overview}>
            <ListSubheader sx={styles["overview--item"]}> Founded: {new Date(startUp.dateFounded).getFullYear()} |</ListSubheader>
            <ListSubheader sx={styles["overview--item"]}> {startUp.employees} employees |</ListSubheader>
            <ListSubheader sx={styles["overview--item"]}> {startUp.totalFunding} $ |</ListSubheader>
            <ListSubheader sx={styles["overview--item"]}> {startUp.currentInvestmentStage} </ListSubheader>
          </Box>
          <ListItemText className="description"> {startUp.shortDescription}</ListItemText>
        </ListItem>)}
      </List>
     </Fragment>;
}
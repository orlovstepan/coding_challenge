import { Fragment, ReactElement, useState, useEffect } from "react";
import { SystemStyleObject } from "@mui/system";
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
    },
    listItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      backgroundColor: "white",
      width: "90vw",
      marginBottom: "10px",
    } as SystemStyleObject,
    
  }

  useEffect(() => {
    StartupHttpService.getStartups().then(response => setStartups(response))
    },[])
    

  return <Fragment> 
     <List id="startup-list">
  {startUps.map((startup: Startup) => (
    <ListItem key={startup.id} sx={styles.listItem}>
      <CardHeader sx={{ padding: "10px 0px 0px 0px" }} title={startup.name} />
      <Box className="overview" sx={styles.overview}>
        <ListSubheader defaultChecked sx={styles["overview--item"]}>
          Founded: {new Date(startup.dateFounded).getFullYear()} |
        </ListSubheader>
        <ListSubheader sx={styles["overview--item"]}>
          {startup.employees} employees |
        </ListSubheader>
        <ListSubheader sx={styles["overview--item"]}>
          {startup.totalFunding} $ |
        </ListSubheader>
        <ListSubheader sx={styles["overview--item"]}>
          {startup.currentInvestmentStage}
        </ListSubheader>
      </Box>
      <ListItemText className="description">
        {startup.shortDescription}
      </ListItemText>
    </ListItem>
  ))}
</List>
     </Fragment>;
}
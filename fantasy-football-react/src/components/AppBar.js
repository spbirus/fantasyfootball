import React, {useState,useEffect} from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Client } from 'espn-fantasy-football-api';
import { leagueId, seasonId } from '../constants/DynastyLeague';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
} 

const AppBarReact = () => {
  const [value, setValue] = useState(0);
  const [tabs, setTabs] = useState([])
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(async () => {
    const client = new Client({leagueId})
    const teamArr = []
    const teams = await client.getTeamsAtWeek({seasonId, scoringPeriodId: 1})
    console.log(teams)
    teams.forEach((team) => {
      teamArr.push(team)
    })
    setTabs(teamArr)
  }, [])
  
  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {
            tabs.map((team) => {
              return <Tab label={team.name} key={`tab_${team.id}`}/>
            })
          }
        </Tabs>
      </AppBar>
      {tabs.map((team) => {
          return <TabPanel value={team.name} index={team.id} key={`tabpanel_${team.id}`}>
            {team.name}
          </TabPanel>
        })
      }
  </div>
  )
}

export default AppBarReact;
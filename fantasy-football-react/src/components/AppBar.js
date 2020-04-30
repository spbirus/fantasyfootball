import React, {useState,useEffect} from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Client } from 'espn-fantasy-football-api';
import { leagueId, seasonId } from '../constants/DynastyLeague';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

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

const AppBarReact = ({toggleDrawer, isDrawerOpen}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [tabs, setTabs] = useState([])
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(async () => {
    const client = new Client({leagueId})
    const teamArr = []
    const teams = await client.getTeamsAtWeek({seasonId, scoringPeriodId: 1})
    teams.forEach((team) => {
      teamArr.push(team)
    })
    setTabs(teamArr)
  }, [])
  
  return (
    <div>
      <AppBar 
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
        })}
      >
        <Button onClick={toggleDrawer(true)} ><MenuIcon /> </Button>
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
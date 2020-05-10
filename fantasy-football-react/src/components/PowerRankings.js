import React, { useEffect, useState, useCallback } from 'react';
import {makeStyles} from '@material-ui/core';
import { connect } from 'react-redux'
import createPowerRankings from '../utils/createPowerRankings'
import {Line} from 'react-chartjs-2';
import {find} from "lodash";
import PowerRankingSkeleton from '../skeletons/powerRankingSkeleton';

const useStyles = makeStyles({
  lineChart: {
    width: "70%",
    margin: "auto"
  },
});

const colors = ['#00FFFF','#808080','#000080','#C0C0C0','#000000','#008000','#808000','#008080','#0000FF','#00FF00','#800080','#ff69ca','#FF00FF','#800000','#FF0000','#FFFF00']

const PowerRankings = ({leagueTeams, leagueMatchups, leagueId, leagueYear}) => {
  const classes = useStyles();
  const [rankings, setRankings] = useState(null);

  const createPower = useCallback(async () => {
    const teamRankings = await createPowerRankings(leagueTeams, leagueMatchups, leagueId, leagueYear);
    const datasets = [];
    teamRankings.forEach(teamRank => {
      const data = teamRank.data.map(item => item.position)
      datasets.push({
        label: find(leagueTeams, {'id': teamRank.id}).abbrev,
        fill: false,
        lineTension: 0,
        backgroundColor: colors[teamRank.id-1],
        borderColor: colors[teamRank.id-1],
        borderWidth: 2,
        data
      })
    })
    const labels = [1,2,3,4,5,6,7,8,9,10,1,12,13,14,15,16];
    setRankings({
      labels,
      datasets
    })
  }, [])
  
  useEffect(() => {
    createPower();
  }, [leagueTeams, leagueMatchups, leagueId, leagueYear])

  return (
    <div>
      <div className={classes.lineChart}>
        {rankings ? <Line
            data={rankings}
            options={{
              title:{
                display:true,
                text:'Power Rankings',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              },
              scales: {
                yAxes: [
                  {
                    type: "linear",
                    display: true,
                    position: "left",
                    id: "y-axis-2",
                    ticks : {
                          reverse : true
                    },
                  }
              ],
              }
            }}
          /> : <PowerRankingSkeleton/>}
        </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    leagueTeams: state.leagueData.leagueTeams,
    leagueMatchups: state.leagueData.leagueMatchups,
    leagueId: state.leagueData.leagueId,
    leagueYear: state.leagueData.leagueYear,
  }
}

export default connect(mapStateToProps)(PowerRankings);
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { TeamContext } from '../../App.jsx';
import DisplayGuard from './DisplayGuard.jsx';
import DisplaySmallForward from './DisplaySmallForward.jsx';
import DisplayForward from './DisplayForward.jsx';
import DisplayPowerForward from './DisplayPowerForward.jsx';
import DisplayCenter from './DisplayCenter.jsx';
import DisplayDraftPicks from './DisplayDraftPicks.jsx';

function DisplayTeamTwo ({ secondTeam, playersOnTeam, tradeToTwo, oneToTwo, tradeToOne, teamDraftPicks }) {

  const [playersTeamTwo, setPlayersTeamTwo] = useState([]);

  useEffect(() => {
    let team = [];
    // if (oneToTwo.length) {
      for (let i = 0; i < playersOnTeam.length; i++) {
        if (oneToTwo.length && playersOnTeam[i].name != oneToTwo[0].name) {
          team.push(playersOnTeam[i])
        }
      }
    // }
    console.log(team, 'team in onetotwo')
    setPlayersTeamTwo(team)
  }, [oneToTwo])

  useEffect(() => {
    let team = playersOnTeam.slice();
    let counter = 0;
    // if (tradeToOne.length) {
    //   for (let i = 0; i < playersTeamTwo.length; i++) {
    //     if (playersTeamTwo[i].name != tradeToOne[0].name) {
    //       counter++;
    //     }
    //   }
    // }
    // if (counter != playersTeamTwo.length) {
    //   team.push(tradeToOne[0])
    // }

    //if (tradeToOne.length) team.push(tradeToOne[0])

    console.log(team, 'team in tradetoone')
    setPlayersTeamTwo(team)

  }, [tradeToOne])

  return (
    <div>
      <div className= 'team-container'>
        <div className= 'team-1-container'>
          <h1>{secondTeam.name}</h1>
          {playersOnTeam.length && Object.keys(teamDraftPicks)?
            <div>
              <DisplayGuard playersOnTeam= {playersTeamTwo} tradeToTwo= {tradeToTwo}/>
              <DisplaySmallForward playersOnTeam= {playersTeamTwo} tradeToTwo= {tradeToTwo}/>
              <DisplayForward playersOnTeam= {playersTeamTwo} tradeToTwo= {tradeToTwo}/>
              <DisplayPowerForward playersOnTeam= {playersTeamTwo} tradeToTwo= {tradeToTwo}/>
              <DisplayCenter playersOnTeam= {playersTeamTwo} tradeToTwo= {tradeToTwo}/>
              <DisplayDraftPicks teamDraftPicks= {teamDraftPicks}/>
            </div>
            : null}
        </div>
      </div>
    </div>
  )
}

export default DisplayTeamTwo

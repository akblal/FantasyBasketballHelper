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
    for (let i = 0; i < playersOnTeam.length; i++) {
      if (oneToTwo.length && playersOnTeam[i].name != oneToTwo[0].name) {
        team.push(playersOnTeam[i])
      }
    }
    setPlayersTeamTwo(team)
  }, [oneToTwo])

  useEffect(() => {
    let team = playersOnTeam.slice();
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

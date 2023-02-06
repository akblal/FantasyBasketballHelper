import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { TeamContext } from '../../App.jsx';
import DisplayGuard from './DisplayGuard.jsx';
import DisplaySmallForward from './DisplaySmallForward.jsx';
import DisplayForward from './DisplayForward.jsx';
import DisplayPowerForward from './DisplayPowerForward.jsx';
import DisplayCenter from './DisplayCenter.jsx';
import DisplayDraftPicks from './DisplayDraftPicks.jsx';

function DisplayOriginalTeam () {

  const {team} = useContext(TeamContext);
  const [playersOnTeam, setPlayersOnTeam] = useState([]);
  const [teamDraftPicks, setTeamDraftPicks] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getPlayers();
    getPicks();
  }, [])

  const getPlayers = () => {
    axios.get('/playersFromTeam', {
      params: {
        team
      }
    })
    .then((results) => {
      let players = results.data;
      console.log (results.data)
      setPlayersOnTeam(players.slice())
    })
    .catch ((err) => {
      console.log (err, 'err from get request in DisplayOriginalTeam')
    })
  }

  const getPicks = () => {
    axios.get('/draftPicks', {
      params: {
        team
      }
    })
    .then((results) => {
      let picks = results.data[0];
      console.log(picks)
      setTeamDraftPicks(picks);
    })
    .catch ((err) => {
      console.log (err, 'err from get request in getting draft picks')
    })
  }

  return (
    <div>
      <div className= 'team-container'>
        <div className= 'team-1-container'>
          <h1>{team.name}</h1>
          {playersOnTeam.length && Object.keys(teamDraftPicks)?
            <div>
              <DisplayGuard playersOnTeam= {playersOnTeam} />
              <DisplaySmallForward playersOnTeam= {playersOnTeam} />
              <DisplayForward playersOnTeam= {playersOnTeam} />
              <DisplayPowerForward playersOnTeam= {playersOnTeam} />
              <DisplayCenter playersOnTeam= {playersOnTeam} />

              <DisplayDraftPicks teamDraftPicks= {teamDraftPicks}/>
            </div>
            : null}
        </div>
      </div>
    </div>
  )
}

export default DisplayOriginalTeam

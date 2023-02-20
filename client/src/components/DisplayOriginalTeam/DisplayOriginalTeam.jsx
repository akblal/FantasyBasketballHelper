import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { TeamContext } from '../../App.jsx';
import DisplayGuard from './DisplayGuard.jsx';
import DisplaySmallForward from './DisplaySmallForward.jsx';
import DisplayForward from './DisplayForward.jsx';
import DisplayPowerForward from './DisplayPowerForward.jsx';
import DisplayCenter from './DisplayCenter.jsx';
import DisplayDraftPicks from './DisplayDraftPicks.jsx';

function DisplayOriginalTeam ({ tradeToTwo, oneToTwo, tradeToOne, firstTeamPlayers }) {

  const {team} = useContext(TeamContext);
  const [playersOnTeam, setPlayersOnTeam] = useState([]);
  const [teamDraftPicks, setTeamDraftPicks] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getPlayers();
    getPicks();
  }, [])

  useEffect(() => {
    let team = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      if (playersOnTeam[i].name != oneToTwo[0].name) {
        team.push(playersOnTeam[i])
      }
    }
    setPlayersOnTeam(team)

  }, [oneToTwo])

  useEffect(() => {
    let team = playersOnTeam.slice();
    if (tradeToOne.length) team.push(tradeToOne[0])
    setPlayersOnTeam(team)
  }, [tradeToOne])

  useEffect(() => {
    setPlayersOnTeam(firstTeamPlayers)
  }, [firstTeamPlayers])

  const getPlayers = () => {
    axios.get('/playersFromTeam', {
      params: {
        team
      }
    })
    .then((results) => {
      let players = results.data;
      setPlayersOnTeam(players.slice());
    })
    .catch ((err) => {
       (err, 'err from get request in DisplayOriginalTeam')
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
          {Array.isArray(playersOnTeam) && playersOnTeam.length && teamDraftPicks && Object.keys(teamDraftPicks)?
            <div>
              <DisplayGuard playersOnTeam= {playersOnTeam} tradeToTwo= {tradeToTwo}/>
              <DisplaySmallForward playersOnTeam= {playersOnTeam} tradeToTwo= {tradeToTwo}/>
              <DisplayForward playersOnTeam= {playersOnTeam} tradeToTwo= {tradeToTwo}/>
              <DisplayPowerForward playersOnTeam= {playersOnTeam} tradeToTwo= {tradeToTwo}/>
              <DisplayCenter playersOnTeam= {playersOnTeam} tradeToTwo= {tradeToTwo}/>
              <DisplayDraftPicks teamDraftPicks= {teamDraftPicks}/>
            </div>
            : null}
        </div>
      </div>
    </div>
  )
}

export default DisplayOriginalTeam

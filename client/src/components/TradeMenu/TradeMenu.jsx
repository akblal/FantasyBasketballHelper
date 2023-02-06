import React, { useState, useContext } from 'react';
import axios from 'axios';

import { TeamContext } from '../../App.jsx';

import DisplayOriginalTeam from '../DisplayOriginalTeam/DisplayOriginalTeam.jsx'
import DisplayGuard from '../DisplayOriginalTeam/DisplayGuard.jsx';
import DisplaySmallForward from '../DisplayOriginalTeam/DisplaySmallForward.jsx';
import DisplayForward from '../DisplayOriginalTeam/DisplayForward.jsx';
import DisplayPowerForward from '../DisplayOriginalTeam/DisplayPowerForward.jsx';
import DisplayCenter from '../DisplayOriginalTeam/DisplayCenter.jsx';
import DisplayDraftPicks from '../DisplayOriginalTeam/DisplayDraftPicks.jsx';
import TradeOption from '../DisplayOriginalTeam/TradeOption.jsx';
import TradeButton from '../DisplayOriginalTeam/TradeButton.jsx';
import TradeButtonFunction from './TradeButtonFunction.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

function TradeMenu () {

  const {team} = useContext(TeamContext);
  const [secondTeam, setSecondTeam] = useState();
  const [secondTeamPlayers, setSecondTeamPlayers] = useState([])
  const [teamDraftPicks, setTeamDraftPicks] = useState(null);

  const handleTeam2 = (team2) => {
    setSecondTeam(team2);
    console.log(team2)
    getPlayers(team2);
    getPicks(team2);

  }

  const getPlayers = (team) => {
    axios.get('/playersFromTeam', {
      params: {
        team
      }
    })
    .then((results) => {
      let players = results.data;
      console.log (results.data)
      setSecondTeamPlayers(players.slice())
    })
    .catch ((err) => {
      console.log (err, 'err from get request in DisplayOriginalTeam')
    })
  }

  const getPicks = (team) => {
    axios.get('/draftPicks', {
      params: {
        team
      }
    })
    .then((results) => {
      let picks = results.data[0];
      console.log(picks, 'picks')
      setTeamDraftPicks(picks);
    })
    .catch ((err) => {
      console.log (err, 'err from get request in getting draft picks')
    })
  }


  return (
    <div className= 'trade-menu-container'>
      <div>
        <DisplayOriginalTeam />
      </div>
      <div>
        <h2>One column</h2>
      </div>
      <div>
        {!secondTeam ?
          <TradeButtonFunction handleTeam2= {handleTeam2}/>
          : <h1>sorry, no trade button</h1>}
      </div>
      <div>
        {secondTeamPlayers.length && teamDraftPicks?
          <div>
          <h1>{secondTeam.name}</h1>
            <DisplayGuard playersOnTeam= {secondTeamPlayers} />
            <DisplaySmallForward playersOnTeam= {secondTeamPlayers} />
            <DisplayForward playersOnTeam= {secondTeamPlayers} />
            <DisplayPowerForward playersOnTeam= {secondTeamPlayers} />
            <DisplayCenter playersOnTeam= {secondTeamPlayers} />
            <DisplayDraftPicks teamDraftPicks= {teamDraftPicks}/>

          </div>
        : <h2>players not shown</h2>}
  </div>
    </div>
  )
}

export default TradeMenu

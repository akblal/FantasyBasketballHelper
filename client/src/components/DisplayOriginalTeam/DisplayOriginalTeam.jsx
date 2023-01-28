import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { TeamContext } from '../../App.jsx';
import DisplayGuard from './DisplayGuard.jsx';
import DisplaySmallForward from './DisplaySmallForward.jsx';
import DisplayForward from './DisplayForward.jsx';
import DisplayPowerForward from './DisplayPowerForward.jsx';
import DisplayCenter from './DisplayCenter.jsx';
import TradeDropDownMenu from './TradeDropDownMenu.jsx';
import TradeButton from './TradeButton.jsx';
import DropDownMenuList from './DropDownMenuList.jsx';

function DisplayOriginalTeam () {

  const {team} = useContext(TeamContext);
  const [playersOnTeam, setPlayersOnTeam] = useState([]);

  useEffect(() => {
    getPlayers();
  }, [])

  const getPlayers = () => {
    axios.get('/playersFromTeam', {
      params: {
        team
      }
    })
    .then((results) => {
      let players = results.data.rows
      setPlayersOnTeam(players.slice())
    })
    .catch ((err) => {
      console.log (err, 'err from get request in DisplayOriginalTeam')
    })
  }

  const handleAddTeamTrade = () => {
    console.log('trade initiated!')
  }

  return (
  <div>
    <h1>list of players on {team.name}</h1>
    <div className= 'team-container'>
      {playersOnTeam.length ?
        <div>
          <DisplayGuard playersOnTeam= {playersOnTeam} />
          <DisplaySmallForward playersOnTeam= {playersOnTeam} />
          <DisplayForward playersOnTeam= {playersOnTeam} />
          <DisplayPowerForward playersOnTeam= {playersOnTeam} />
          <DisplayCenter playersOnTeam= {playersOnTeam} />
        </div>
        : null}
      {playersOnTeam.length ?
        <TradeDropDownMenu>
          <TradeButton icon= '+'>
            <DropDownMenuList />
          </TradeButton>
        </TradeDropDownMenu>
        : null}
    </div>
  </div>
  )
}

export default DisplayOriginalTeam
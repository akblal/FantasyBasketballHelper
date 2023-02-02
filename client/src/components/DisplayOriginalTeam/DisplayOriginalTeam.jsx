import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { TeamContext } from '../../App.jsx';
import DisplayGuard from './DisplayGuard.jsx';
import DisplaySmallForward from './DisplaySmallForward.jsx';
import DisplayForward from './DisplayForward.jsx';
import DisplayPowerForward from './DisplayPowerForward.jsx';
import DisplayCenter from './DisplayCenter.jsx';
import TradeOption from './TradeOption.jsx';
import TradeButton from './TradeButton.jsx';
import DropDownMenuList from './DropDownMenuList.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

function DisplayOriginalTeam () {

  const {team} = useContext(TeamContext);
  const [playersOnTeam, setPlayersOnTeam] = useState([]);
  const [open, setOpen] = useState(false);

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

  return (
    <div>
      <div className= 'team-container'>
        <div className= 'team-1-container'>
          <h1>{team.name}</h1>
          {playersOnTeam.length ?
            <div>
              <DisplayGuard playersOnTeam= {playersOnTeam} />
              <DisplaySmallForward playersOnTeam= {playersOnTeam} />
              <DisplayForward playersOnTeam= {playersOnTeam} />
              <DisplayPowerForward playersOnTeam= {playersOnTeam} />
              <DisplayCenter playersOnTeam= {playersOnTeam} />
            </div>
            : null}
        </div>
        <div className= 'add-trade-button-container'>
          {playersOnTeam.length ?
            <div>
              <h1>Trade</h1>
              <TradeOption>
                <TradeButton icon= {<FontAwesomeIcon icon= {faRightLeft} className= 'trade-icon'/>}>
                </TradeButton>
              </TradeOption>
            </div>
              : null}

        </div>
      </div>
    </div>
  )
}

export default DisplayOriginalTeam
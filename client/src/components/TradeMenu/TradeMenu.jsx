import React, { useState, useContext, useEffect } from 'react';
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
import TradeGuard from '../TradedPlayers/TradeGuard.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

function TradeMenu () {

  const {team} = useContext(TeamContext);
  const [secondTeam, setSecondTeam] = useState();
  const [secondTeamPlayers, setSecondTeamPlayers] = useState([])
  const [teamDraftPicks, setTeamDraftPicks] = useState(null);
  const [addToTwo, setAddToTwo] = useState([]);
  const [oneToTwo, setOneToTwo] = useState([]);
  const [tradeToOne, setTradeToOne] = useState([]);

  const handleTeam2 = (team2) => {
    setSecondTeam(team2);
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

  const tradeToTwo = (player) => {
    setOneToTwo([])
    let temp = addToTwo.slice();
    temp.push(player);
    setAddToTwo(temp);

    console.log (addToTwo, 'players to be traded to 2')
    if (player === tradeToOne[0]) {
      console.log('ARARM')
      //setOneToTwo(null)
    }
    setOneToTwo([player])
  }

  const removePlayer = (player) => {
    console.log(player, 'in remove player')
    console.log(addToTwo, 'players to be traded to 2')
    let temp = [];
    let copy = addToTwo.slice();
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].name != player.name) {
        temp.push(copy[i])
      }
    }
    setAddToTwo(temp.slice());
    console.log(temp, 'players at the end of removal to be added to 2')
    setTradeToOne([player])


  }

  return (
    <div className= 'trade-menu-container'>
      <div>
        <DisplayOriginalTeam tradeToTwo= {tradeToTwo} oneToTwo= {oneToTwo} tradeToOne= {tradeToOne}/>
      </div>
      <div>
        <h2>One column</h2>
      </div>
      <div>
        {!secondTeam ?
          <TradeButtonFunction handleTeam2= {handleTeam2}/>
          : null}
        {addToTwo.length ?
          <div>
            <h1>players</h1>
            <TradeGuard playersOnTeam= {addToTwo} removePlayer= {removePlayer}/>
            <DisplaySmallForward playersOnTeam= {addToTwo} />
            <DisplayForward playersOnTeam= {addToTwo} />
            <DisplayPowerForward playersOnTeam= {addToTwo} />
            <DisplayCenter playersOnTeam= {addToTwo} />
          </div>
          : null
        }
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

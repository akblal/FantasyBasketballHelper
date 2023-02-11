import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPlaneDeparture, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function DisplayForward ({ playersOnTeam, tradeToTwo }) {

  const [forward, setForward] = useState([]);

  const forwardLabel = '(F)';

  useEffect(() => {
    getForward();
  }, [playersOnTeam])

  const getForward = async() => {
    let tempForward = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'F') {
        tempForward.push(player)
      }
    }

    for (let i = 0; i < tempForward.length; i++) {
      let player = tempForward[i];
      const playerInjuryReport = await axios.get('/getInjuryUpdate', {
        params: {
          player
        }
      })
      if ((playerInjuryReport.data).length) {
        player.playerInjuryReport = playerInjuryReport.data[0];
      }
    }

    tempForward = tempForward.sort (function(a,b) {
      return Number((b.salary).split(',').join('').split('$').join('')) - Number((a.salary).split(',').join('').split('$').join(''));
    })
    setForward(tempForward.slice());
  }

  const tradePlayer = (player) => {
    tradeToTwo(player)
  }

  return (
    <div>
    {forward.length ? forward.map((player) => {
      return (
        <div key= {player.name} className= 'player-container'>
          <div className= 'player-photo-container'>
            <FontAwesomeIcon icon= {faCircleUser} className= 'player-photo'/>
          </div>
          <div className= 'player-general-info-container'>
            <div className= 'player-name-container'>
              <div className= 'player-name'>
              {forwardLabel} {player.name}
              {player.playerInjuryReport && player.playerInjuryReport.status && player.playerInjuryReport.status === 'Out' && <div className= 'injury-out'></div>}
              {player.playerInjuryReport && player.playerInjuryReport.status && player.playerInjuryReport.status === 'Day-To-Day' && <div className= 'injury-day-to-day'></div>}
              {!player.playerInjuryReport && <div className= 'injury-healthy'></div>}
              </div>
            </div>
            <div className= 'player-salary'>
              {player.salary}
            </div>
          </div>
          <div className= 'player-trade-button-container'>
            <FontAwesomeIcon icon= {faPlaneDeparture} className= 'player-trade-button' onClick= {() => tradePlayer(player)}/>
          </div>
        </div>
      )
    }) : null}
    </div>
  )
}

export default DisplayForward
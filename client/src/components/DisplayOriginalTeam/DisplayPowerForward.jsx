import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPlaneDeparture, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function DisplayPowerForward ({ playersOnTeam, tradeToTwo }) {

  const [powerForward, setPowerForward] = useState([]);

  const powerForwardLabel= '(PF)';

  useEffect(() => {
    getPowerForward();
  }, [playersOnTeam])

  const getPowerForward = async () => {
    let tempPowerForward = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'C-F' || player.position === 'F-C') {
        tempPowerForward.push(player)
      }
    }

    for (let i = 0; i < tempPowerForward.length; i++) {
      let player = tempPowerForward[i];
      const playerInjuryReport = await axios.get('/getInjuryUpdate', {
        params: {
          player
        }
      })
      if ((playerInjuryReport.data).length) {
        player.playerInjuryReport = playerInjuryReport.data[0];
      }
    }

    tempPowerForward = tempPowerForward.sort (function(a,b) {
      return Number((b.salary).split(',').join('').split('$').join('')) - Number((a.salary).split(',').join('').split('$').join(''));
    })
    setPowerForward(tempPowerForward.slice());
  }

  const tradePlayer = (player) => {
    tradeToTwo(player)
  }

  return (
    <div>
    {powerForward.length ? powerForward.map((player) => {
      return (
        <div key= {player.name} className= 'player-container'>
          <div className= 'player-photo-container'>
            <FontAwesomeIcon icon= {faCircleUser} className= 'player-photo'/>
          </div>
          <div className= 'player-general-info-container'>
            <div className= 'player-name-container'>
              <div className= 'player-name'>
              {powerForwardLabel} {player.name}
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

export default DisplayPowerForward
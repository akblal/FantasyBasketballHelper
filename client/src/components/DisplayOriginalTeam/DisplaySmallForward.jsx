import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPlaneDeparture, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function DisplaySmallForward ({ playersOnTeam, tradeToTwo }) {

  const [smallForward, setSmallForward] = useState([]);

  const smallForwardLabel = '(SF)';

  useEffect(() => {
    let tempSmallForward = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'G-F' || player.position === 'F-G') {
        tempSmallForward.push(player)
      }
    }
    tempSmallForward = tempSmallForward.sort (function(a,b) {
      return Number((b.salary).split(',').join('').split('$').join('')) - Number((a.salary).split(',').join('').split('$').join(''));
    })
    setSmallForward(tempSmallForward.slice());
  }, [playersOnTeam])

  const tradePlayer = (player) => {
    tradeToTwo(player)
  }

  return (
    <div>
    {smallForward.length ? smallForward.map((player) => {
      return (
        <div key= {player.name} className= 'player-container'>
          <div className= 'player-photo-container'>
            <FontAwesomeIcon icon= {faCircleUser} className= 'player-photo'/>
          </div>
          <div className= 'player-general-info-container'>
            <div className= 'player-name-container'>
              <div className= 'player-name'>
              {smallForwardLabel} {player.name}
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

export default DisplaySmallForward
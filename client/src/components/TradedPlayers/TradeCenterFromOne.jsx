import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPlaneDeparture, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function TradeCenterFromOne({ playersOnTeam, removePlayerFromTeam1Block }) {

  const [center, setCenter] = useState([]);

  const centerLabel = '(C)';

  useEffect(() => {
    getCenter();
  }, [playersOnTeam])

  const getCenter = () => {
    let tempCenter = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'C') {
        tempCenter.push(player)
      }
    }
    tempCenter = tempCenter.sort (function(a,b) {
      return Number((b.salary).split(',').join('').split('$').join('')) - Number((a.salary).split(',').join('').split('$').join(''));
    })
    setCenter(tempCenter.slice());
  }

  const tradePlayer = (player) => {
    removePlayerFromTeam1Block(player)
  }

  return (
    <div>
    {center.length ? center.map((player) => {
      return (
        <div key= {player.name} className= 'player-container'>
          <div className= 'player-photo-container'>
            <FontAwesomeIcon icon= {faCircleUser} className= 'player-photo'/>
          </div>
          <div className= 'player-general-info-container'>
            <div className= 'player-name-container'>
              <div className= 'player-name'>
              {centerLabel} {player.name}
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

export default TradeCenterFromOne
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function TradePowerForwardFromOne ({ playersOnTeam, removePlayerFromTeam1Block }) {

  const [powerForward, setPowerForward] = useState([]);

  const powerForwardLabel = '(PF)';

  useEffect(() => {
    getPowerForward();
  }, [playersOnTeam])

  const getPowerForward = () => {
    let tempPowerForward = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'F-C' || player.position === 'C-F') {
        tempPowerForward.push(player)
      }
    }
    tempPowerForward = tempPowerForward.sort (function(a,b) {
      return Number((b.salary).split(',').join('').split('$').join('')) - Number((a.salary).split(',').join('').split('$').join(''));
    })
    setPowerForward(tempPowerForward.slice());
  }

  const tradePlayer = (player) => {
    removePlayerFromTeam1Block(player)
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
                </div>
              </div>
              <div className= 'player-salary'>
                {player.salary}
              </div>
            </div>
            <div className= 'player-trade-button-container'>
              <FontAwesomeIcon icon= {faXmark} className= 'player-trade-button' onClick= {() => tradePlayer(player)}/>
            </div>
          </div>
        )
      }) : null}
    </div>
  )
}

export default TradePowerForwardFromOne
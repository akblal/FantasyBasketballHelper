import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function TradeGuardFromOne ({ playersOnTeam, removePlayerFromTeam1Block }) {

  const [guard, setGuard] = useState([]);

  const guardLabel = '(G)';

  useEffect(() => {

    getGuard();
  }, [playersOnTeam])

  const getGuard = () => {
    let tempGuard = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'G') {
        tempGuard.push(player)
      }
    }
    tempGuard = tempGuard.sort (function(a,b) {
      return Number((b.salary).split(',').join('').split('$').join('')) - Number((a.salary).split(',').join('').split('$').join(''));
    })
    setGuard(tempGuard.slice());
  }

  const tradePlayer = (player) => {
    removePlayerFromTeam1Block(player)
  }

  return (
    <div>
      {guard.length ? guard.map((player) => {
        return (
          <div key= {player.name} className= 'player-container'>
            <div className= 'player-photo-container'>
              <FontAwesomeIcon icon= {faCircleUser} className= 'player-photo'/>
            </div>
            <div className= 'player-general-info-container'>
              <div className= 'player-name-container'>
                <div className= 'player-name'>
                  {guardLabel} {player.name}
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
              <FontAwesomeIcon icon= {faXmark} className= 'player-trade-button' onClick= {() => tradePlayer(player)}/>
            </div>
          </div>
        )
      }) : null}`
    </div>
  )
}

export default TradeGuardFromOne
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPlaneDeparture, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function DisplayGuard ({ playersOnTeam, tradeToTwo }) {

  const [guard, setGuard] = useState([]);

  const guardLabel = '(G)';

  useEffect(() => {
    getGuard();
  }, [playersOnTeam])

  const getGuard = async() => {
    let tempGuard = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'G') {
        tempGuard.push(player)
      }
    }

    for (let i = 0; i < tempGuard.length; i++) {
      let player = tempGuard[i];
      const playerInjuryReport = await axios.get('/getInjuryUpdate', {
        params: {
          player
        }
      })
      if ((playerInjuryReport.data).length) {
        player.playerInjuryReport = playerInjuryReport.data[0];
        console.log(player.playerInjuryReport, 'player injury')
      }
    }

    tempGuard = tempGuard.sort (function(a,b) {
      return Number((b.salary).split(',').join('').split('$').join('')) - Number((a.salary).split(',').join('').split('$').join(''));
    })

    setGuard(tempGuard.slice());
  }

  const tradePlayer = (player) => {
    tradeToTwo(player)
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
                {player.playerInjuryReport && player.playerInjuryReport.status && (player.playerInjuryReport.status === 'Day-To-Day' || player.playerInjuryReport.status === 'Out') &&
                  <div id= 'injury-report-container'>
                    <div id= 'injury-report-text'>
                      <div>
                        {player.playerInjuryReport.status}
                      </div>
                      <div>
                        {player.playerInjuryReport.date}
                      </div>
                      <div>
                        {player.playerInjuryReport.comment}
                      </div>
                    </div>
                    {player.playerInjuryReport && player.playerInjuryReport.status && player.playerInjuryReport.status === 'Out' && <div className= 'injury-out'></div>}
                    {player.playerInjuryReport && player.playerInjuryReport.status && player.playerInjuryReport.status === 'Day-To-Day' && <div className= 'injury-day-to-day'></div>}
                  </div>
                }

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

export default DisplayGuard

// {player.playerInjuryReport && player.playerInjuryReport.status && (player.playerInjuryReport.status === 'Day-To-Day' || player.playerInjuryReport.status === 'Out')}
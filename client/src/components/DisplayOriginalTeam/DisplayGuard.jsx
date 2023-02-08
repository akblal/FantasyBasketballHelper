import React, { useState, useEffect } from 'react'

function DisplayGuard ({ playersOnTeam, tradeToTwo }) {

  const [guard, setGuard] = useState([]);

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
    setGuard(tempGuard.slice());
  }



  const tradePlayer = (player) => {
    tradeToTwo(player)
  }

  return (
    <div>
      {guard.length ?
        <h2>Guard</h2>
        : null}
      {guard.length ? guard.map((player) => {
        return <h4 key= {player.name} className= 'player-container' onClick= {() => tradePlayer(player)}>{player.name} {player.salary}</h4>
      }) : null}
    </div>
  )
}

export default DisplayGuard
import React, { useState, useEffect } from 'react'

function TradeGuard ({ playersOnTeam }) {

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
    console.log (tempGuard, 'temp guard')
    setGuard(tempGuard.slice());
  }

  console.log(playersOnTeam, 'in guards')

  const tradePlayer = (player) => {
    console.log(player, ' to be traded')
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

export default TradeGuard
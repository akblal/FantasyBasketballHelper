import React, { useState, useEffect } from 'react'

function TradeGuard ({ playersOnTeam, removePlayer }) {

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
    tempGuard = tempGuard.sort (function(a,b) {
      return Number((b.salary).split(',').join('').split('$').join('')) - Number((a.salary).split(',').join('').split('$').join(''));
    })
    setGuard(tempGuard.slice());
  }

  const tradePlayer = (player) => {
    removePlayer(player)
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
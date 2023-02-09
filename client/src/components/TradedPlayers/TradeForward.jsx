import React, { useState, useEffect } from 'react'

function TradeForward ({ playersOnTeam, removePlayer }) {

  const [forward, setForward] = useState([]);

  useEffect(() => {
    getForward();
  }, [playersOnTeam])

  const getForward = () => {
    let tempForward = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'F') {
        tempForward.push(player)
      }
    }
    tempForward = tempForward.sort (function(a,b) {
      return Number((b.salary).split(',').join('').split('$').join('')) - Number((a.salary).split(',').join('').split('$').join(''));
    })
    setForward(tempForward.slice());
  }

  const tradePlayer = (player) => {
    removePlayer(player)
  }

  return (
    <div>
      {forward.length ?
        <h2>Forward</h2>
        : null}
      {forward.length ? forward.map((player) => {
        return <h4 key= {player.name} className= 'player-container' onClick= {() => tradePlayer(player)}>{player.name} {player.salary}</h4>
      }) : null}
    </div>
  )
}

export default TradeForward
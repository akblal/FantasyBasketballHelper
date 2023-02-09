import React, { useState, useEffect } from 'react'

function TradeSmallForward ({ playersOnTeam, removePlayerFromTeam1Block }) {

  const [smallForward, setSmallForward] = useState([]);

  useEffect(() => {
    getSmallForward();
  }, [playersOnTeam])

  const getSmallForward = () => {
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
  }

  const tradePlayer = (player) => {
    removePlayerFromTeam1Block(player)
  }

  return (
    <div>
      {smallForward.length ?
        <h2>Small Forward</h2>
        : null}
      {smallForward.length ? smallForward.map((player) => {
        return <h4 key= {player.name} className= 'player-container' onClick= {() => tradePlayer(player)}>{player.name} {player.salary}</h4>
      }) : null}
    </div>
  )
}

export default TradeSmallForward
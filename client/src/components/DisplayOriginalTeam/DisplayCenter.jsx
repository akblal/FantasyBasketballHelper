import React, { useState, useEffect } from 'react'

function DisplayCenter ({ playersOnTeam, tradeToTwo }) {

  const [center, setCenter] = useState([]);

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
    tradeToTwo(player)
  }

  return (
    <div>
      {center.length ?
        <h2>Center</h2>
        : null}
      {center.length ? center.map((player) => {
        return <h4 key= {player.name} className= 'player-container' onClick= {() => tradePlayer(player)}>{player.name} {player.salary}</h4>
      }) : null}
    </div>
  )
}

export default DisplayCenter
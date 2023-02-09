import React, { useState, useEffect } from 'react'

function DisplayForward ({ playersOnTeam }) {

  const [forward, setForward] = useState([]);

  useEffect(() => {

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
  }, [])

  return (
    <div>
      {forward.length ?
        <h2>Forward</h2>
        : null}
      {forward.length ? forward.map((player) => {
        return <h4 key= {player.name} className= 'player-container'>{player.name} {player.salary}</h4>
      }) : null}
    </div>
  )
}

export default DisplayForward
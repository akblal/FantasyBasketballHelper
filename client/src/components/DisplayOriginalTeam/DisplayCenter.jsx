import React, { useState, useEffect } from 'react'

function DisplayCenter ({ playersOnTeam }) {

  const [center, setCenter] = useState([]);

  useEffect(() => {

    let tempCenter = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'C') {
        tempCenter.push(player)
      }
    }
    setCenter(tempCenter.slice());
  }, [])

  return (
    <div>
      {center.length ?
        <h2>Center</h2>
        : null}
      {center.length ? center.map((player) => {
        return <h4 key= {player.name} className= 'player-container'>{player.name} {player.salary}</h4>
      }) : null}
    </div>
  )
}

export default DisplayCenter
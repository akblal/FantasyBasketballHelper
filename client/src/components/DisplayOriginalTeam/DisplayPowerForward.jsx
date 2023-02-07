import React, { useState, useEffect } from 'react'

function DisplayPowerForward ({ playersOnTeam }) {

  const [powerForward, setPowerForward] = useState([]);

  useEffect(() => {

    let tempPowerForward = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'C-F' || player.position === 'F-C') {
        tempPowerForward.push(player)
      }
    }
    setPowerForward(tempPowerForward.slice());
  }, [])

  return (
    <div>
      {powerForward.length ?
        <h2>Power Forward</h2>
        : null}
      {powerForward.length ? powerForward.map((player) => {
        return <h4 key= {player.name} className= 'player-container'>{player.name} {player.salary}</h4>
      }) : null}
    </div>
  )
}

export default DisplayPowerForward
import React, { useState, useEffect } from 'react'

function DisplaySmallForward ({ playersOnTeam }) {

  const [smallForward, setSmallForward] = useState([]);

  useEffect(() => {

    let tempSmallForward = [];
    for (let i = 0; i < playersOnTeam.length; i++) {
      let player = playersOnTeam[i];
      if (player.position === 'G-F' || player.position === 'F-G') {
        tempSmallForward.push(player)
      }
    }
    setSmallForward(tempSmallForward.slice());
  }, [])

  return (
    <div>
      {smallForward.length ?
        <h2>Small Forward</h2>
        : null}
      {smallForward.length ? smallForward.map((player) => {
        return <h4 key= {player.name}>{player.name}</h4>
      }) : null}
    </div>
  )
}

export default DisplaySmallForward
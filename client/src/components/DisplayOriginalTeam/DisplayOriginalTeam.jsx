import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { TeamContext } from '../../App.jsx';

function DisplayOriginalTeam () {

  const {team} = useContext(TeamContext);
  const [selectedTeam, setSelectedTeam] = useState(null)

  useEffect(() => {
    getPlayers();
  }, [])

  const getPlayers = () => {
    axios.get('/playersFromTeam', {
      params: {
        team
      }
    })
    .then((results) => {
      let players = results.data.rows
      setSelectedTeam(players.slice())
      console.log(players)
    })
    .catch ((err) => {
      console.log (err, 'err from get request in DisplayOriginalTeam')
    })
  }

  return (
  <div>
    <h1>list of players on {team.name}</h1>
    {selectedTeam ? selectedTeam.map((player) => {
      return <h2 key= {player.name}>{player.name}</h2>
    }) : null}
  </div>
  )
}

export default DisplayOriginalTeam
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { TeamContext } from '../../App.jsx';

function DisplayOriginalTeam () {

  const {team} = useContext(TeamContext);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [guard, setGuard] = useState([]);
  const [forward, setForward] = useState([]);
  const [smallForward, setSmallForward] = useState([]);
  const [center, setCenter] = useState([]);
  const [powerForward, setPowerForward] = useState([]);

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
      let tempGuard = [];
      let tempForward = [];
      let tempCenter = [];
      let tempSmallForward = [];
      let tempPowerForward = [];
      for (let i = 0; i < players.length; i++) {
        let player = players[i];
        if (player.position === 'G') {
          tempGuard.push(player)
        } else if (player.position === 'F') {
          tempForward.push(player)
        } else if (player.position === 'G-F' || player.position === 'F-G') {
          tempSmallForward.push(player)
        } else if (player.position === 'F-C' || player.position === 'C-F') {
          tempPowerForward.push(player)
        } else {
          tempCenter.push(player)
        }
      }
      setGuard(tempGuard.slice());
      setForward(tempForward.slice());
      setSmallForward(tempSmallForward.slice());
      setPowerForward(tempPowerForward.slice());
      setCenter(tempCenter.slice());
    })
    .catch ((err) => {
      console.log (err, 'err from get request in DisplayOriginalTeam')
    })
  }

  return (
  <div>
    <h1>list of players on {team.name}</h1>
    {guard.length ?
      <h2>Guard</h2>
      : null}
    {guard.length ? guard.map((player) => {
      return <h4 key= {player.name}>{player.name}</h4>
    }) : null}
    {smallForward.length ?
      <h2>Small Forward</h2>
      : null}
    {smallForward.length ? smallForward.map((player) => {
      return <h4 key= {player.name}>{player.name}</h4>
    }) : null}
    {forward.length ?
      <h2>Forward</h2>
      : null}
    {forward.length ? forward.map((player) => {
      return <h4 key= {player.name}>{player.name}</h4>
    }) : null}
    {powerForward.length ?
      <h2>Power Forward</h2>
      : null}
    {powerForward.length ? powerForward.map((player) => {
      return <h4 key= {player.name}>{player.name}</h4>
    }) : null}
    {center.length ?
      <h2>Center</h2>
      : null}
    {center.length ? center.map((player) => {
      return <h4 key= {player.name}>{player.name}</h4>
    }) : null}
  </div>
  )
}

export default DisplayOriginalTeam
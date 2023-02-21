import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { allNBATeams } from './NBATeams.js'
import { TeamContext } from '../../App.jsx'

const SelectTeam = () => {

  const {team, setTeam} = useContext(TeamContext);
  let navigate = useNavigate();

  const handleSelectedTeam = (team) => {
    setTeam(team);
    if (team) {
      navigate('players-on-team');
    }
  }

  return (
    <div>
      <div className= 'all-team-logo-container'>
        {allNBATeams.map((team, index) => {
          return (
            <div key= {index} className= 'team-logo-container' onClick= {() => handleSelectedTeam(team)}>
              <div className= 'team-logo'>
                  {team.logo}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelectTeam;
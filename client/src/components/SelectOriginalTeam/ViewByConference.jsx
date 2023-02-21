import React, { useState, useContext } from 'react';
import { westernConference, easternConference } from './NBATeams.js'
import { useNavigate } from 'react-router-dom';
import { TeamContext } from '../../App.jsx';

const ViewByConference = () => {

  const {team, setTeam} = useContext(TeamContext);
  let navigate = useNavigate();

  const handleSelectedTeam = (team) => {
    setTeam(team);
    if (team) {
      navigate('players-on-team');
    }
  }

  return (
    <div className= 'conference-team-logo-container'>
      <div className= 'western-team-logo-container'>
        {westernConference.map((team, index) => {
          return (
            <div key= {index} className= 'team-logo-container' onClick= {() => handleSelectedTeam(team)}>
              <div className= 'team-logo'>
                {team.logo}
              </div>
            </div>
          )
        })}
      </div>
      <div className= 'eastern-team-logo-container'>
      {easternConference.map((team, index) => {
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

export default ViewByConference;
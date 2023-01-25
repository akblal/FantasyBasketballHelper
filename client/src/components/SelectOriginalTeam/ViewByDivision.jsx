import React, { useState, useContext } from 'react';

import { atlanticDivision, centralDivision, southeastDivision } from './NBATeams.js'
import { TeamContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';

const ViewByDivision = () => {

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
      <div className= 'western-conference-division-container'>
        <div className= 'two-divisions-container'>
          <div className= 'two-divisions-division-container'>
            {atlanticDivision.map((team, index) => {
              return (
                <div key= {index} className= 'team-logo-container' onClick= {() => handleSelectedTeam(team)}>
                  <div className= 'team-logo'>
                    {team.name}
                  </div>
                </div>
              )
            })}
          </div>
          <div className='two-divisions-division-container'>
            {centralDivision.map((team, index) => {
              return (
                <div key= {index} className= 'team-logo-container' onClick= {() => handleSelectedTeam(team)}>
                  <div className= 'team-logo'>
                    {team.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className= 'one-division-container'>
          {southeastDivision.map((team, index) => {
            return (
              <div key= {index} className= 'team-logo-container' onClick= {() => handleSelectedTeam(team)}>
                <div className= 'team-logo'>
                  {team.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className= 'western-conference-division-container'>
        <div className= 'two-divisions-container'>
          <div className= 'two-divisions-division-container'>
            {atlanticDivision.map((team, index) => {
              return (
                <div key= {index} className= 'team-logo-container' onClick= {() => handleSelectedTeam(team)}>
                  <div className= 'team-logo'>
                    {team.name}
                  </div>
                </div>
              )
            })}
          </div>
          <div className='two-divisions-division-container'>
            {centralDivision.map((team, index) => {
              return (
                <div key= {index} className= 'team-logo-container' onClick= {() => handleSelectedTeam(team)}>
                  <div className= 'team-logo'>
                    {team.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className= 'one-division-container'>
          {southeastDivision.map((team, index) => {
            return (
              <div key= {index} className= 'team-logo-container' onClick= {() => handleSelectedTeam(team)}>
                <div className= 'team-logo'>
                  {team.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default ViewByDivision
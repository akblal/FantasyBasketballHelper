import React, { useState, useContext } from 'react';
import { westernConference, easternConference } from './NBATeams.js'
import { useNavigate } from 'react-router-dom';
import { TeamContext } from '../../App.jsx';
import WesternConferenceLogo from '../../icons/nba-Western_Conference_logo.png';
import EasternConferenceLogo from '../../icons/nba-Eastern_Conference_logo.png';

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
    <div>
      <div className= 'conference-logo-container'>
        <img src= {WesternConferenceLogo} alt= 'Western Conference Logo' />
        <img src= {EasternConferenceLogo} alt= 'Eastern Conference Logo' />
      </div>
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
    </div>
  )
}

export default ViewByConference;
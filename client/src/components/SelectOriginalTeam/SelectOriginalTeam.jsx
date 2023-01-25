import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { TeamContext } from '../../App.jsx';
import AllTeams from './ViewAllTeams.jsx';
import ViewByConference from './ViewByConference.jsx';
import ViewByDivision from './ViewByDivision.jsx';

function SelectOriginalTeam ({ }) {

  const {team, setTeam} = useContext(TeamContext);

  let navigate = useNavigate();
  const [viewAllTeams, setViewAllTeams] = useState(true);
  const [viewByConference, setViewByConference] = useState (false);
  const [viewByDivision, setViewByDivision] = useState (false);

  const handleAllTeams = () => {
    setViewAllTeams(true);
    setViewByConference(false);
    setViewByDivision(false);
  }

  const handleConference = () => {
    setViewAllTeams(false);
    setViewByConference(true);
    setViewByDivision(false);
  }

  const handleDivision = () => {
    setViewAllTeams(false);
    setViewByConference(false);
    setViewByDivision(true);
  }

  return (
    <div>
      {team ? <h1>{team.name}</h1> : <h1>no team</h1>}
      <button onClick= {handleAllTeams}> All Teams </button>
      <button onClick= {handleConference}> Conference</button>
      <button onClick= {handleDivision}> Division</button>
      {viewAllTeams ?
        <AllTeams /> :
        null
      }
      {viewByConference ?
        <ViewByConference /> :
        null
      }
      {viewByDivision ?
        <ViewByDivision /> :
        null
      }
    </div>
  )
}

export default SelectOriginalTeam
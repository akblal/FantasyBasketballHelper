import React, { useContext } from 'react';
import axios from 'axios';

import { TeamContext } from '../../App.jsx';

function DisplayOriginalTeam () {

  const {team} = useContext(TeamContext);

  return (
    <h1>
    list of players on {team.name}
    </h1>
  )
}

export default DisplayOriginalTeam
import React, { useContext } from 'react';

import { TeamContext } from '../../App.jsx';

import TradeOption from '../DisplayOriginalTeam/TradeOption.jsx';
import TradeButton from '../DisplayOriginalTeam/TradeButton.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

function TradeButtonFunction ({ handleTeam2 }) {

  const {team} = useContext(TeamContext);

  const handleTeamTwo = (team) => {
    handleTeam2(team);
  }

  return (
    <div>
      <div className= 'add-trade-button-container'>
        {Object.keys(team).length ?
          <div>
            <h1>Trade</h1>
            <TradeOption>
              <TradeButton icon= {<FontAwesomeIcon icon= {faRightLeft} className= 'trade-icon'/>} handleTeamTwo= {handleTeamTwo}>
              </TradeButton>
            </TradeOption>
          </div>
            : null}
      </div>
    </div>

  )
}

export default TradeButtonFunction
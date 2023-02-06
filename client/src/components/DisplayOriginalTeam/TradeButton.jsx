import React, { useState } from 'react';
import DropDownMenuList from './DropDownMenuList.jsx';

function TradeButton ( props ) {

  const [open, setOpen] = useState(false);

  const pickedTeam = (team) => {
    setOpen(false);
    props.handleTeamTwo(team);
  }

  return (
    <li className= 'trade-button-item'>
      <a href= '#' className= 'trade-button' onClick= {() => setOpen(!open)}>
        { props.icon }
      </a>
      {open && <DropDownMenuList pickedTeam= {pickedTeam}/>}
    </li>
  )
}

export default TradeButton
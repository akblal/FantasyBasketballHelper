import React, { useState, useEffect, useContext } from 'react';
import { allNBATeams, easternConference, westernConference } from '../SelectOriginalTeam/NBATeams.js'
import { CSSTransition } from 'react-transition-group';

import { TeamContext } from '../../App.jsx';

function DropDownMenuList ( {pickedTeam} ) {

  const {team} = useContext(TeamContext);
  const [availableTradePartners, setAvailableTradePartners] = useState([]);
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  useEffect(() => {
    let tempPartners = [];
    for (let i = 0; i < allNBATeams.length; i++) {
      let temp = allNBATeams[i];
      if (temp.name != team.name) {
        tempPartners.push(temp);
      }
    }
    setAvailableTradePartners(tempPartners.slice())
  }, [])

  function DropDownItem (props) {
    return (
      <div>
        <a href= '#' className= 'menu-item' onClick= {() => {props.goToMenu ? setActiveMenu(props.goToMenu) : handleTradePartner(props.value)}}>
          {props.children}
        </a>
      </div>
    )
  }

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const handleTradePartner = (team) => {
    console.log(team, 'trade partner');
    pickedTeam()
  }

  return (
    <div className= 'dropdown' style = {menuHeight > 600 ? {height: 600} : {height: menuHeight}}>
      <CSSTransition in= {activeMenu === 'main'} unmountOnExit timeout= {500} classNames= 'menu-primary' onEnter = {calcHeight}>
        <div className= 'menu'>
          <DropDownItem goToMenu= 'westernConference'>Western Conference</DropDownItem>
          <DropDownItem goToMenu= 'easternConference'>Eastern Conference</DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition in= {activeMenu === 'easternConference'} unmountOnExit timeout= {500} classNames= 'menu-secondary' onEnter = {calcHeight}>
        <div className= 'menu'>
          <DropDownItem goToMenu= 'main'>Back</DropDownItem>
          {easternConference.length ?
            easternConference.map((team) => {
            return <DropDownItem key= {team.name} value= {team}> {team.name} </DropDownItem>
          })
          : null}
        </div>
      </CSSTransition>
      <CSSTransition in= {activeMenu === 'westernConference'} unmountOnExit timeout= {500} classNames= 'menu-secondary' onEnter = {calcHeight}>
        <div className= 'menu'>
          <DropDownItem goToMenu= 'main'> Back</DropDownItem>
          {westernConference.length ?
            westernConference.map((team) => {
            return <DropDownItem key= {team.name} value= {team}> {team.name} </DropDownItem>
          })
          : null}
        </div>
      </CSSTransition>
    </div>
  )
}

export default DropDownMenuList
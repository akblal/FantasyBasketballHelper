import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { TeamContext } from '../../App.jsx';
import AllTeams from './ViewAllTeams.jsx';
import ViewByConference from './ViewByConference.jsx';
import ViewByDivision from './ViewByDivision.jsx';

import dataSlider from './dataSlider.js';
import BTNSlider from './BTNSlider.jsx';

function SelectOriginalTeam ({ }) {

  const {team, setTeam} = useContext(TeamContext);
  // const [slideIndex, setSlideIndex] = useState(0);

  let navigate = useNavigate();
  const [viewAllTeams, setViewAllTeams] = useState(true);
  const [viewByConference, setViewByConference] = useState (false);
  const [viewByDivision, setViewByDivision] = useState (false);

  // const nextSlide = () => {
  //   if (slideIndex !== dataSlider.length -1) {
  //     setSlideIndex(slideIndex + 1);
  //   } else {
  //     setSlideIndex(0);
  //   }
  // }

  // const prevSlide = () => {
  //   if (slideIndex !== 0) {
  //     setSlideIndex(slideIndex - 1);
  //   } else {
  //     setSlideIndex(dataSlider.length -1);
  //   }
  // }

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

  // const logging = (value) => {
  //   console.log(value)
  // }

  return (
    <div>
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

// <div className= 'slider-container'>
//         {dataSlider.map((view, idx) => {
//           return (
//             <div index= {idx} className= {slideIndex === idx? 'slide-active-anim' : 'slide'}>
//               {idx === (view.id) ?
//                 <div onClick= {() => {logging(view)}} > {view.data}</div>
//                 : null
//               }
//             </div>
//           )
//         })}
//         <BTNSlider moveSlide= {nextSlide} direction= {'next'}/>
//         <BTNSlider moveSlide= {prevSlide} direction= {'prev'}/>
//         <div className= 'container-dots'>
//           hi
//           {Array.from({length: dataSlider.length}).map((view, idx) => {
//             <div className= {slideIndex === idx ? 'dot active' : 'dot'}></div>
//           })}
//         </div>
//       </div>
//       <div></div>
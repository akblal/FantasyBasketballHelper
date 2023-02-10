import React from 'react';

function DisplayDraftPicks ({ teamDraftPicks }) {
  return (
    <div className= 'draft-picks-container'>
      <div className= 'first-round-picks-container'>
        <div className= 'round-pick-label'>
          First Round
        </div>
        <div className= 'number-picks'>
          {teamDraftPicks.firstround}
        </div>

      </div>
      <div className= 'second-round-picks-container'>
        <div className= 'round-pick-label'>
          Second Round
        </div>
        <div className= 'number-picks'>
          {teamDraftPicks.secondround}
        </div>
      </div>
    </div>
  )
}

export default DisplayDraftPicks
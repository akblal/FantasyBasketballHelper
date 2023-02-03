import React from 'react';

function DisplayDraftPicks ({ teamDraftPicks }) {
  console.log (teamDraftPicks)
  return (
    <div>
      <h2>
        Draft Picks
      </h2>
      <h4>
        First Round: {teamDraftPicks.secondround}
      </h4>
      <h4>
        Second Round: {teamDraftPicks.secondround}
      </h4>
    </div>
  )
}

export default DisplayDraftPicks
import React from 'react';

function TradeOption( props ) {

  return (
    <div className= 'trade-container'>
      <ul className= 'trade-button-container'>
        { props.children }
      </ul>
    </div>
  )
}

export default TradeOption
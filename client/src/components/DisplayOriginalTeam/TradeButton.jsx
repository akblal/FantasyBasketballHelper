import React, { useState } from 'react';

function TradeButton ( props ) {

  const [open, setOpen] = useState(false);

  return (
    <div className= 'trade-button-container'>
      <a href= '#' className= 'trade-button' onClick= {() => {setOpen(!open)}}>
        {props.icon}
      </a>

      {open && props.children}
    </div>
  )
}

export default TradeButton
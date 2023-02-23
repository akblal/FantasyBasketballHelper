import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

function BTNSlider ({ direction, moveSlide }) {
  return (
    <div>
      <button className= {direction === 'next' ? 'btn-slide next' : 'btn-slide prev'} onClick= {moveSlide}>
        {direction === 'next' ?
          <FontAwesomeIcon icon= {faArrowRight} />
          : <FontAwesomeIcon icon= {faArrowLeft} />}
      </button>
    </div>
  )
}

export default BTNSlider
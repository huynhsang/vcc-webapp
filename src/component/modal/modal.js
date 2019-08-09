import React from 'react';

import './modal.scss';

const modal = (props) => {
   return (
      <div className={props.show ? "open-modal" : "close-modal"}>
         <div className={props.show ? "modal-wrapper" : null}>
            {props.children}
         </div>
      </div>
   )
}

export default modal;

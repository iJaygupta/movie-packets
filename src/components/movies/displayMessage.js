import React from 'react';

 export default function DisplayMessage(props) {

    if(!props.hasOwnProperty('message')){
      return(<div>Not Found</div>);
    } else  {
      return(<div>{props.message}</div>);
    }
}

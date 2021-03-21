import React from 'react';

const MovielistHeading = (props) => {
   return (
       <div className = 'col'>
           <h1>
               {props.heading}
           </h1>
       </div>
   );
}
export default MovielistHeading;
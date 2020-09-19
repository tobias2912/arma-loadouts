import React from 'react'
import './Title.css';
import tram from './icons/trikk.jpg'; 
function Title() {
  return (
    <div className="Title" styles={{ backgroundImage:`url(${tram})` }}>
      <h1>Tobias sin side :)</h1>
    </div>
  )
}
export default Title
import React from 'react'
import './Sidebar.css'

import { Button } from '@material-ui/core';
import 'fontsource-roboto';


function Sidebar() {
  return (
    <div className="sidebar">
        <Button color="secondary">Github</Button>
        <Button color="secondary">Andre ting</Button>
    </div>
  )
}
export default Sidebar
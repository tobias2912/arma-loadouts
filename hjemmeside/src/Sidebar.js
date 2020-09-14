import React from 'react'
import './Sidebar.css'
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import 'fontsource-roboto';


function Sidebar() {
  return (
    <div className="sidebar">
        <Button>Github</Button>
        <Button>Andre ting</Button>
    </div>
  )
}
export default Sidebar
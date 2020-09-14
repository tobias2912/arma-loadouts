import React from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Title from "./Title";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Tobben</title>
        <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <Title/>
      <Sidebar/>
    </div>
  );
}

export default App;
import React, { useState, useEffect, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import SelectOriginalTeam from './components/SelectOriginalTeam/SelectOriginalTeam.jsx';
import DisplayOriginalTeam from './components/DisplayOriginalTeam/DisplayOriginalTeam.jsx'

const container = document.getElementById('root');
const root = createRoot(container);
export const TeamContext = createContext(null);

function App () {

  const [team, setTeam] = useState(null);
  const providerValue = {
    team,
    setTeam
  }
  return (
    <TeamContext.Provider value= {providerValue}>
      <Router>
        <Routes>

            <Route path= '/' element= {<SelectOriginalTeam />}/>
            <Route path= 'players-on-team' element={<DisplayOriginalTeam />} />

        </Routes>
      </Router>
    </TeamContext.Provider>
  )
}

root.render(<App />)

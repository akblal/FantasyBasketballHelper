import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';


const container = document.getElementById('root');
const root = createRoot(container);

function App () {

  return (
    <div>Fantasy Basketball Helper</div>
  )
}

root.render(<App />)
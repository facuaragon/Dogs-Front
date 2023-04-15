
import {Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import Detail from './views/detail/Detail';
import Create from './views/create/Create';



function App() {
    

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route exact path='/home' element={ <Home /> } />
        <Route path='/home/:id' element={ <Detail /> } />
        <Route path='/create' element={ <Create /> } />
      </Routes>

    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Recipies from './pages/Recipies';
import Pantry from './pages/Pantry';

const App = () => {
  return (
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/recipes' element={<Recipies/>}/>
      <Route path='/pantry' element={<Pantry/>}/>
     </Routes>
  );
};
export default App;

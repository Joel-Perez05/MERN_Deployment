import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PetsList from './components/PetsList';
import NewPet from './components/NewPet';
import EditPet from './components/EditPet';
import PetDetails from './components/PetDetails';

function App() {
  const [pets, setPets] = useState([]);

  const removePetFromDom = petId => {
    setPets(pets.filter(pets => pets._id !== petId))
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<PetsList pets={pets} setPets={setPets} />} path="/" />
          <Route element={<NewPet />} path="/pets/new" />
          <Route element={<PetDetails removePetFromDom={removePetFromDom} />} path="/pets/:id" />
          <Route element={<EditPet />} path="/pets/:id/edit" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

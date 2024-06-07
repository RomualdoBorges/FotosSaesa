import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Pages/Form";
import Confirm from "./Pages/Confirm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

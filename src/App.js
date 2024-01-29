import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes } from "react-router-dom";
import appRoutes from "./utils/routes.js";

const makeRoutes = () => {
  return appRoutes.map((r, i) => {
    const Component = r.component;
    let allProps = { ...r.props };
    return <Route key={i} path={r.path} element={<Component {...allProps}/>}/>;
  });
}


function App() {
  return (
    <div className="App">
      <Routes>{makeRoutes()}</Routes>
    </div>
  );
}

export default App;

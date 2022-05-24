import Header from "components/Header";
import { AppProvider } from "hooks";
import React from "react";
import { Routes } from "../src/routes";
import "./styles.css";

function App() {
  return (
    <AppProvider>
      <Header />
      <Routes />
    </AppProvider>
  );
}

export default App;


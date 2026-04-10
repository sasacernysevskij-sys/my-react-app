import React, { useState } from "react";
import Authorize from "./authorize";
import Container from "./conteiner";
import Filter from "./Filter";
import "./App.css";

const App: React.FC = () => {
  const [filter, setFilter] = useState({ type: "", brand: "" });

  const handleLogin = (username: string, password: string) => {
    console.log("Login", username, password);
  };

  const handleRegister = (username: string, password: string, bornDate: string) => {
    console.log("Register", username, password, bornDate);
  };

  const handleFilter = (criteria: any) => {
    setFilter(criteria);
  };

  return (
    <div className="app">
      <h2>Store</h2>

      <Authorize onLogin={handleLogin} onRegister={handleRegister} />

      <Filter onFilter={handleFilter} />

      <Container filter={filter} />
    </div>
  );
};

export default App;
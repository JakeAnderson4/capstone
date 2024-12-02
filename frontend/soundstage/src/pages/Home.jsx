// src/pages/Home.jsx
import React from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="content">
        <Sidebar />
        <Map />
      </div>
    </div>
  );
};

export default Home;



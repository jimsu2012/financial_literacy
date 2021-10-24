import React from "react";
import "../style/IndexPage.css";
import trophy from "../assets/trophy.png";
import notebook from "../assets/notebook.png";
import speaker from "../assets/speaker.png";
import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <div className="index">
      <div className="header">
        <h3>Learn how you can be</h3>
        <h1>Financially Independent</h1>
      </div>
      <div class="wrap">
        <div className="search">
          <input className="searchTerm" type="text" />
        </div>
        <button className="searchButton" type="submit">
          Search!
        </button>
      </div>

      <div className="cards" style={{ marginTop: 30 }}>
        <Link to="/habits" style={{ textDecoration: "none" }}>
          <div className="card on-hover-card">
            <div className="card-header">
              <img src={trophy} alt="trophy" />
            </div>
            <div class="card-body">
              <h4>Challenges</h4>
            </div>
          </div>
        </Link>
        <Link to="/explore" style={{ textDecoration: "none" }}>
          <div className="card on-hover-card">
            <div className="card-header">
              <img src={notebook} alt="notebook" />
            </div>
            <div class="card-body">
              <h4>Quick lessons</h4>
            </div>
          </div>
        </Link>
        <Link to="/workshops" style={{ textDecoration: "none" }}>
          <div className="card on-hover-card">
            <div className="card-header">
              <img src={speaker} alt="speaker" />
            </div>
            <div class="card-body">
              <h4>Workshops</h4>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;

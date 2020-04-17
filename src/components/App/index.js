import React from "react";
import "./styles.scss";
import { Main } from "../Main";
import starwarsLogo from './../../imgs/starwars-logo.svg';

export function App() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
      
      <h1>
        <img className="logo" src={starwarsLogo} alt="Star Wars" />
      </h1>

      <Main />
    </>
  );
};

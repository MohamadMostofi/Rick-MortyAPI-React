import React, { useState } from "react";

import { EyeIcon } from "@heroicons/react/24/outline";

function CharacterList({ characters }) {
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item}></Character>
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red">
        <EyeIcon />
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨🏼" : "👩🏼"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info">
      <span
        className={`status ${item.status === "Dead" ? "red" : "green"}`}
      ></span>
      <span className="info"> {item.status}</span>
      <span className="info"> - {item.species}</span>
    </div>
  );
}

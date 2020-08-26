import React from "react";

import "./Main.css";

const START_VALUE = 3;
const handleChange = (e, func) => {
  if (!isNaN(+e.target.value)) {
    func(Math.min(Math.max(+e.target.value, 3), 6));
  }
};

function Main({ setWidth, setHeight, setStatus, setGameDif }) {
  const [localWidth, setLocalWidth] = React.useState(START_VALUE);
  const [localHeight, setLocalHeight] = React.useState(START_VALUE);
  return (
    <>
      <div>
        cols:
        <input
          className="main__input"
          value={localWidth}
          onChange={(e) => handleChange(e, setLocalWidth)}
        />
      </div>
      <div>
        rows:
        <input
          className="main__input"
          value={localHeight}
          onChange={(e) => handleChange(e, setLocalHeight)}
        />
      </div>
      <div className="main__checkbox">
        hardmode:
        <input
          className="main__input"
          type="checkbox"
          onChange={() => setGameDif(600)}
        />
      </div>
      <button
        className="main__button"
        onClick={() => {
          setWidth(localWidth);
          setHeight(localHeight);
          setStatus("play");
        }}
      >
        start
      </button>
    </>
  );
}
export default Main;

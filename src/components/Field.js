import React from "react";

import "./Field.css";

function Field({ width, height, setStatus, gameDif }) {
  const arrayLength = width * height;
  const PLATE_SIZE = 100;
  const ONE_STEP = gameDif;
  const [fieldAsArray, setFieldAsArray] = React.useState(
    new Array(arrayLength).fill(null).map((it, i) => ({ id: i, state: "free" }))
  );

  const timeoutRef = React.useRef();
  const [select, setSelect] = React.useState({ id: null });

  function selectRandomCell(array) {
    const wonCellArray = fieldAsArray.filter((it) => it.state === "win");
    const lostCellArray = fieldAsArray.filter((it) => it.state === "loose");
    if (wonCellArray.length > fieldAsArray.length / 2) {
      return { id: null };
    }
    if (lostCellArray.length > fieldAsArray.length / 2) {
      return { id: null };
    }

    const filteredArray = array.filter((it) => it.state === "free");
    const random = Math.floor(Math.random() * filteredArray.length);
    return filteredArray[random];
  }

  function backgroundSwitch(cell) {
    switch (cell.id) {
      case select.id:
        return "yellow";
      default:
        switch (cell.state) {
          case "win":
            return "#9ccc65";
          case "loose":
            return "#ff5252";
          default:
            return "#b0bec5";
        }
    }
  }

  function clickHandler(cell) {
    const wonCellArray = fieldAsArray.filter((it) => it.state === "win");
    if (cell.id === select.id) {
      setFieldAsArray(
        fieldAsArray.map((newCell) => {
          if (newCell.id === select.id) {
            newCell.state = "win";
            return newCell;
          }
          return newCell;
        })
      );
      clearTimeout(timeoutRef.current);
      setSelect(selectRandomCell.bind(this, fieldAsArray));
    }
    if (wonCellArray.length + 1 > fieldAsArray.length / 2) {
      clearTimeout(timeoutRef.current);
      setStatus("won");
    }
  }

  React.useEffect(() => {
    const lostCellArray = fieldAsArray.filter((it) => it.state === "loose");
    const timeoutId = setTimeout(() => {
      setFieldAsArray(
        fieldAsArray.map((newCell) => {
          if (newCell.id === select.id) {
            newCell.state = "loose";
            return newCell;
          }
          return newCell;
        })
      );
      setSelect(selectRandomCell.bind(this, fieldAsArray));
    }, ONE_STEP);
    if (lostCellArray.length > fieldAsArray.length / 2) {
      clearTimeout(timeoutRef.current);
      setStatus("lost");
    }
    timeoutRef.current = timeoutId;
    return () => clearTimeout(timeoutRef.current);
  });

  return (
    <>
      <div
        style={{
          width: `${PLATE_SIZE * width}px`,
        }}
      >
        {fieldAsArray.map((cell) => {
          return (
            <button
              onClick={clickHandler.bind(this, cell)}
              key={cell.id}
              className="field__unit"
              style={{
                width: `${PLATE_SIZE - 10}px`,
                height: `${PLATE_SIZE - 10}px`,
                background: backgroundSwitch(cell),
              }}
            />
          );
        })}

        {}
      </div>
      <button
        className="field__button"
        onClick={() => setStatus("introduction")}
      >
        back
      </button>
    </>
  );
}

export default Field;

import React from "react";

import "./App.css";
import Field from "./components/Field";
import Main from "./components/Main";
import Header from "./components/Header";

function App() {
  const [width, setWidth] = React.useState(3);
  const [height, setHeight] = React.useState(3);
  const [status, setStatus] = React.useState("introduction");
  const [gameDif, setGameDif] = React.useState(750);

  return (
    <main className="container">
      {status === "introduction" && (
        <>
          <Main
            setWidth={setWidth}
            setHeight={setHeight}
            setStatus={setStatus}
            setGameDif={setGameDif}
          />
        </>
      )}
      {status === "play" && (
        <Field
          width={width}
          height={height}
          setStatus={setStatus}
          gameDif={gameDif}
        />
      )}
      {status === "won" && (
        <>
          <Header text="You won, congratulations." status="won" />
          <Main
            setWidth={setWidth}
            setHeight={setHeight}
            setStatus={setStatus}
            setGameDif={setGameDif}
          />
        </>
      )}
      {status === "lost" && (
        <>
          <Header status="lost" text="You lost, try again." />
          <Main
            setWidth={setWidth}
            setHeight={setHeight}
            setStatus={setStatus}
            setGameDif={setGameDif}
          />
        </>
      )}
    </main>
  );
}

export default App;

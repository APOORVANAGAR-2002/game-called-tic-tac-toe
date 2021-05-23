import React, { useState } from "react";
import TicTacToe from "./TicTacToe";
import { createBoard } from "./utils/boardUtils";

let BoardContext = React.createContext();

function App() {

  let [board, setBoard] = useState(createBoard());

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      <TicTacToe />
    </BoardContext.Provider>

  )

}

export { App, BoardContext };

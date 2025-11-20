import { useState } from "react";
import "./App.css";

const ALPHABET = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const WORDOFTHEDAY = "ABOUT";
function App() {
  return (
    <main>
      <div className="WOD">
        {WORDOFTHEDAY.split("").map((letterOfWORD) => (
          <div className="lettersWORD"></div>
        ))}
      </div>

      {ALPHABET.map((letter) => (
        <button id={letter} className="button-letters">
          {letter}
        </button>
      ))}
    </main>
  );
}
export default App;

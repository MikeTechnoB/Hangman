import { useState, useEffect } from "react";
import "./App.css";

const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const WORDOFTHEDAY = "ABOUT";

function App() {
  const [lives, setLives] = useState(5);
  const [guessedLetters, setGuessedLetters] = useState([]);

  const handleLetterClick = (letter) => {
    console.log("Clicked:", letter);
    setGuessedLetters([...guessedLetters, letter]);

    if (!WORDOFTHEDAY.includes(letter)) {
      setLives(lives - 1);
    }
  };

  const handleGameOver = () => {
    alert("You Lose! Word is:" + WORDOFTHEDAY);
    setLives(5);
    setGuessedLetters([]);
  };

  const handleWin = () => {
    alert("You won!");
    setLives(5);
    setGuessedLetters([]);
  };

  useEffect(() => {
    const checkAllLettersGuessed = WORDOFTHEDAY.split("").every((letter) =>
      guessedLetters.includes(letter)
    );

    if (checkAllLettersGuessed && guessedLetters.length > 0) {
      setTimeout(() => {
        handleWin();
      }, 500);
    }
    if (lives === 0) {
      setTimeout(() => {
        handleGameOver();
      }, 500);
    }
  }, [guessedLetters, lives]);

  return (
    <div className="wrapper">
      <header>
        <img src="src/assets/hangman.png" alt="" />
        HANGMAN
      </header>
      <div className="wordhint">()</div>
      <main>
        <div className="WOD">
          {WORDOFTHEDAY.split("").map((letterOfWORD) => (
            <div className="lettersWORD">
              {guessedLetters.includes(letterOfWORD) ? letterOfWORD : ""}
            </div>
          ))}
        </div>
        <div className="button-container">
          {ALPHABET.map((letter) => (
            <button
              id={letter}
              className="button-letters"
              onClick={() => handleLetterClick(letter)}
              disabled={guessedLetters.includes(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        <div className="liveleft">Live Left: {lives}</div>
      </main>
    </div>
  );
}
export default App;

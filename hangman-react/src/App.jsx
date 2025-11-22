import { useState, useEffect } from "react";
import "./App.css";
import WORDS from "./words.js";
import confetti from "canvas-confetti";

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

const RANDOMWORD = WORDS[Math.floor(Math.random() * WORDS.length)];
const WORDOFTHEDAY_URL = "https://word-of-the-day.de/api/random";
const WORDOFTHEDAY_Def_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

function App() {
  const [DEF_OFWORD, setDefOfWord] = useState("");
  const [lives, setLives] = useState(8);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [WORDOFTHEDAY, setWordOfTheDay] = useState(RANDOMWORD);

  // couldn't find a random word from the api
  async function fetchWordOfTheDay() {
    const wordRes = await fetch(WORDOFTHEDAY_URL);
    console.log();
    const wordJson = await wordRes.json();
  }

  async function fetchWordOfTheDayMeaning(WORDOFTHEDAY) {
    const wordRes = await fetch(WORDOFTHEDAY_Def_URL + WORDOFTHEDAY);
    const wordJson = await wordRes.json();
    let DEF_OFWORD = wordJson[0].meanings[0].definitions[0].definition;
    setDefOfWord(DEF_OFWORD);
  }

  useEffect(() => {
    //fetchWordOfTheDay();
    fetchWordOfTheDayMeaning(WORDOFTHEDAY);
  }, [WORDOFTHEDAY]);

  const handleLetterClick = (letter) => {
    console.log("Clicked:", letter);
    setGuessedLetters([...guessedLetters, letter]);

    if (!WORDOFTHEDAY.includes(letter)) {
      setLives(lives - 1);
    }
  };

  const handleGameOver = () => {
    alert("You Lose! Word is:" + WORDOFTHEDAY);
    setWordOfTheDay(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setLives(5);
    setGuessedLetters([]);
  };

  const handleWin = () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    alert("You won!");
    setWordOfTheDay(WORDS[Math.floor(Math.random() * WORDS.length)]);
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
      <div className="wordhint">({DEF_OFWORD})</div>
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

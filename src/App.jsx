import React, { useState } from "react"
import Header from "./components/Header"
import Status from "./components/Status"
import { languages } from "./languages"
import Language from "./components/Language"
import Letter from "./components/Letter"
import QwertyLetter from "./components/QwertyLetter"
import NewGameButton from "./components/NewGameButton"
import { clsx } from "clsx"
import { getFarewellText, getRandomWord } from "./utils"
import FarewellText from "./components/FarewellText"
import Confetti from "react-confetti"

export default function AssemblyEndgame() {

  //state variables
  const [currentWord, setCurrentWord] = useState(getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  //derived variables
  const numGuessesLeft = languages.length - 1
  const wrongGuessCount = guessedLetters.filter((letter) => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every((letter) => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= numGuessesLeft
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
  const gameStatusClass = clsx("game-status-bar", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  //static values
  const qwertyKeyboard = "qwertyuiopasdfghjklzxcvbnm"

  //JSX elements
  const letterElement = (currentWord.split("")).map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(isGameLost && !guessedLetters.includes(letter) && "missed-letter")
    return <Letter
      key={index}
      className={letterClassName}
      char={shouldRevealLetter ? letter : ""}
    />
  })

  const keyboardElement = (qwertyKeyboard.split("")).map((letter) => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    })

    return <QwertyLetter
      className={className}
      key={letter}
      letter={letter.toUpperCase()}
      ariaDisabled={guessedLetters.includes(letter)}
      ariaLabel={`Letter ${letter}`}
      disabled={isGameOver}
      onClick={() => addGuessedLetter(letter)}
    />
  })

  const languageElement = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount
    const className = clsx({
      lost: isLanguageLost
    })
    return <Language
      key={language.id}
      className={`language-chip ${className}`}
      name={language.name}
      backgroundColor={language.backgroundColor}
      color={language.color} />
  })

  //functions
  const addGuessedLetter = (newLetter) => {
    setGuessedLetters((prevLetters) => {
      const lettersSet = new Set(prevLetters)
      lettersSet.add(newLetter)

      return Array.from(lettersSet)
    })
  }


  const startNewGame = () => {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  const renderGameStatus = () => {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <FarewellText
          message={getFarewellText(languages[wrongGuessCount - 1].name)}
        />
      )
    }

    if (isGameWon) {
      return (
        <Status
          status="You Win!"
          message="Well Done!🎉"
        />
      )
    }
    else if (isGameLost) {
      return (
        <Status
          status="You lost!"
          message="You better start learning Assembly lil bro😭"
        />
      )
    }
    else {
      return null
    }

  }

  //HTML mark-up
  return (
    <>
      <main>
        {isGameWon && <Confetti />}
        <Header />
        <section
          aria-live="polite"
          role="status"
          className={gameStatusClass}
        >{renderGameStatus()}</section>
        <section className="language-section">
          {languageElement}
        </section>
        <section className="word-section">
          {letterElement}
        </section>

        {/* Combined visually-hidden aria-live region for status updates */}
        <section
          className="sr-only"
          aria-live="polite"
          role="status"
        >
          <p>
            {
              currentWord.includes(lastGuessedLetter) ? `Correct! The letter ${lastGuessedLetter} is in the word` : `Sorry, the letter ${lastGuessedLetter} is not in the word`
            }
            You have {numGuessesLeft} attempts left
          </p>
          <p>Current Word: {currentWord.split("").map((letter) => guessedLetters.includes(letter) ? letter + "." : "blank.").join("")}</p>
        </section>
        <section className="keyboard-section">
          {keyboardElement}
        </section>
        {isGameOver && <NewGameButton onClick={startNewGame} />}

      </main>
    </>
  )
}
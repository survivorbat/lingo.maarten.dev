import * as React from 'react'
import { useState } from 'react'
import './App.css'
import { Container } from 'react-bootstrap'
import Word from './components/Word'
import GameWord from './logic/game-word'

function App() {
  const [words, setWords] = useState<GameWord[]>([new GameWord('hello')])

  const handleGuess = (guess: string) => {
    if (words[words.length - 1].guess(guess)) {
      alert('yay')
      return
    }

    setWords([...words, new GameWord(words[0].word)])
  }

  return (
    <Container fluid className="app-container">
      {words.map((w, key) => <Word key={key} word={w} guess={handleGuess} />)}
    </Container>
  )
}

export default App

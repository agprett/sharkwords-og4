import './style.css';
import getRandomWord from './src/randomWord.js';
import setSharkImage from './src/sharkImage.js';
import { setupWord, isLetterInWord, revealLetterInWord } from './src/word.js';
import setupGuesses from './src/guess.js';

document.querySelector('#app').innerHTML = `
  <section id="shark-img"></section>

  <section id="game-status"></section>

  <section id="word-container"></section>

  <section id="letter-buttons"></section>
`;

const initSharkwords = () => {
  let numWrong = 0;
  const word = getRandomWord();

  setSharkImage(document.querySelector('#shark-img'), numWrong)

  setupWord(document.querySelector('#word-container'), word)

  const handleGuess = (guessEvent, letter) => {
    guessEvent.target.disabled = true

    if(isLetterInWord(letter)) {
      revealLetterInWord(letter)
    } else {
      numWrong++
      setSharkImage(document.querySelector('#shark-img'), numWrong)
    }

    //default to true so that if not all letters are guessed it will be set to false
    let completedWord = true

    //get all letter boxes to check if they have a letter in them
    let letterBoxes = document.querySelectorAll('.letter-box')
    
    //check if all letter boxes have a letter, if they don't set completed word to false and stop the loop
    for(const box of letterBoxes) {
      if(box.innerText === '') {
        completedWord = false
        break
      }
    }

    //check if either the word is completed or max number of guesses, then disable all buttons and display the win or lose message
    if(completedWord) {
      document.querySelectorAll('button').forEach(button => {
        button.disabled = true
      })
      document.querySelector('#game-status').innerText = 'You win!'
    } else if(numWrong > 4) {
      document.querySelectorAll('button').forEach(button => {
        button.disabled = true
      })
      document.querySelector('#game-status').innerText = 'You lost!'
    }
  };
  
  setupGuesses(document.querySelector('#letter-buttons'), handleGuess);

  // for debugging:
  console.log(`[INFO] Correct word is: ${word}`);
};

initSharkwords();

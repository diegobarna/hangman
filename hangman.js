window.onload = function () {
  var submitPlayer1 = document.getElementById('phrase-button');
  submitPlayer1.addEventListener('click', submitPhrase, false);

  var submitPlayer2 = document.getElementById('guess-button');
  submitPlayer2.addEventListener('click', submitGuess, false);

  var game = {
    phraseToGuess: "",
    guessedLetters: [],
    hiddenPhrase: "",
    guessesLeft: 6,
  };

  function setPhraseToGuess (phrase) {
      game.phraseToGuess = phrase.toUpperCase();
      game.hiddenPhrase = parsePhrase(game.phraseToGuess);
    }

  function submitPhrase () {
    var phrase = document.getElementById('player1-phrase').value;

    if  (clean(phrase).length < 4) {
      alert("This phrase is too short! Try again, please.");
      phrase = "";
    }
    else {
      setPhraseToGuess(phrase);
      refreshShowingPhrase();
      changePlayer();
    }
  }

  function submitGuess () {
    var guess = clean(document.getElementById('player2-guess').value);
    var letters = /[A-Z]+$/;
    if (guess.length > 1 && checkSolution(guess)) {
      alert("You did it! Player 2 wins.\nRefresh the page to start another game.");
      gameOver("player2");
    } else if (letters.test(guess)) {
      checkLetter(guess);
      document.getElementById('player2-guess').value = "";
    } else {
      alert("You have to write a letter or the exact phrase!\nTry again, please.");
      document.getElementById('player2-guess').value = "";
    }
  }

  function changePlayer () {
    document.getElementById("player1").classList.toggle('hide');
    document.getElementById("player2").classList.toggle('hide');
  }

  function parsePhrase (phrase) {
    var parsed = "";
    var guessed = game.guessedLetters;
    for (i = 0; i < phrase.length; i++) {
      var char = "";
      if (phrase[i] === " ") {
        char = "- ";
      } else if (phrase[i] >= "A" && phrase[i] <= "Z" && guessed.indexOf(phrase[i]) < 0) {
        char = "_ ";
       } else {
        char = phrase[i] + " ";
      }
      parsed = parsed.concat(char);
    }
    return parsed;
  }

  function refreshShowingPhrase () {
    game.hiddenPhrase = parsePhrase(game.phraseToGuess);
    document.getElementById("phrase-to-guess").textContent = game.hiddenPhrase;
  }

  function clean(phrase) {
    return phrase.toUpperCase().replace(/[^\w\s]|_/g, "");
  }

  function checkSolution (phrase) {
    return clean(phrase) === clean(game.phraseToGuess);
  }

  function checkLetter (guess) {
    var guessArray = clean(game.phraseToGuess).split("");
    if (game.guessedLetters.indexOf(guess) >= 0) {
      alert("You already guessed letter '" + guess + "'.\nPlease choose another one.");
    } else {
      if (guessArray.indexOf(guess) >= 0) {
        game.guessedLetters.push(guess);
        refreshShowingPhrase();
        if (clean(game.hiddenPhrase) === clean(game.phraseToGuess)) {
          alert("You did it! Player 2 wins.\nRefresh the page to start another game.");
          gameOver("player2");
        } else {
          alert("Well done! You found all '" + guess + "' letters in the phrase.");
        }
      } else {
        if (--game.guessesLeft <= 0) {
          alert("You are dead! Player 1 wins.\nRefresh the page to start another game.");
          gameOver("player1");
        } else {
          refreshShowingPhrase();
          alert("You missed! You have " + game.guessesLeft + " more guesses until a certain death.");
          document.getElementById('lives').textContent = game.guessesLeft.toString();
        }
      }
    }
  }

  function gameOver(player) {
    document.getElementById("player2").classList.toggle('hide');
    document.getElementById("game-over").classList.toggle('hide');    
  }
}


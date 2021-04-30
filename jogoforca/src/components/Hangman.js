import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words.js';

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";
import step7 from "./images/7.jpg";


class Hangman extends Component {
    static defaultProps = {
        maxWrong: 7,
        images: [step0, step1, step2, step3, step4, step5, step6, step7]
    }

    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            guessed: new Set([]),
            answer: randomWord()
        }
    }

    handleGuess = e => {
        let letter = e.target.value;
        this.setState(st =>({
            guessed: st.guessed.add(letter),
            mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }));
    }

    guessedWord() {
        return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button
              class='btn btn-lg btn-success m-1'
              key={letter}
              value={letter}
              onClick={this.handleGuess}
              disabled={this.state.guessed.has(letter)}
            >
              {letter}
            </button>
        ));
    }

    resetButton = () => {
        this.setState({
            mistake: 0,
            guessed: new Set([]),
            answer: randomWord()
        });
    }

    render() {
        const gameOver = this.state.mistake >= this.props.maxWrong;
        const isWinner = this.guessedWord().join("") === this.state.answer;
        let gameStat = this.generateButtons();

        if (isWinner) {
            gameStat = "Você Ganhou!"
        }

        if (gameOver) {
            gameStat = "Você Perdeu!"
        }

        return (
            <div className="Hangman container">
                <h1 className="text-center text-monospace font-weight-bolder text-warning">Jogo Da Forca</h1>
                <div className="float-right">Palpites Errados: {this.state.mistake} De {this.props.maxWrong}</div>
                <div className="text-center">
                    <img src={this.props.images[this.state.mistake]} alt=""/>
                </div>
                <div className="text-center">
                    <p>Todos Desenvolvedores Tem:</p>
                    <p>
                        {!gameOver ? this.guessedWord() : this.state.answer}
                    </p>
                    <p>{gameStat}</p>
                    <button className='btn btn-info' onClick={this.resetButton}>Reiniciar</button>
                </div>
            </div>
        )
    }
}

export default Hangman;
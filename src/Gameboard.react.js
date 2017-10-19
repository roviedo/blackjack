import React, { Component } from 'react';
import './App.css';
import Game from './Game.react';

class Gameboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
          winner: null
        };
        this._newGame = this._newGame.bind(this);
    }

    render() {
        return (
            <div>
                {this.state.showComponent ?
                   <Game /> :
                   <div className="GameBoard">
                       <button className="button" onClick={this._newGame}>New Game</button>
                   </div>
                }
            </div>
        );
    }

    _newGame() {
        this.setState({
          showComponent: true,
        });
    }
}

export default Gameboard;

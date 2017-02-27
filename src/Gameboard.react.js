import React, { Component } from 'react';
import './App.css';
import CardsDeck from './CardsDeck.react';

class Gameboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false
        };
        this._newGame = this._newGame.bind(this);
    }

    render() {
        return (
            <div>
                {this.state.showComponent ?
                   <CardsDeck /> :
                   <div className="GameBoard">
                       <button onClick={this._newGame}>New Game</button>
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

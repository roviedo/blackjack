import React, { Component } from 'react';
import './App.css';

class CardsDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
          deck: this._makeDeck()
        };
    }

    render() {
        return (
            <div className="CardsDeck">
                My Deck
                <input value={this.state.inputValue} onChange={this._dealPlayers}/>
            </div>
        );
    }

    _makeDeck() {
        let deck = [];
        const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const suits = ["Clubs", "Spades", "Hearts", "Diamonds"];

        let card = function(rank) {
            for(let i=0; i<suits.length;i++) {
                deck.push(rank + " " + suits[i])
            }
        }

        ranks.map(
            function(rank) {
                card(rank)
            }
        );

        return deck;
    }

    _dealPlayers(event) {
        //playersHands = [{'player 1': [], 'player 2': [], 'player n': [] ....}]
        console.log("players", event.target.value);
        //favorites[Math.floor(Math.random() * favorites.length)]
    }
}

export default CardsDeck;

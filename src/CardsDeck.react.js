import React, { Component } from 'react';
import './App.css';

class CardsDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
          deck: this._makeDeck(),
          playersHands: []
        };
        this._dealPlayers = this._dealPlayers.bind(this);
    }

    render() {
        if (this.state.playersHands) {
            this.state.playersHands.map((hand)=> {
                console.log('hand', hand);
            })
        }
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
                return card(rank)
            }
        );

        return deck;
    }

    _dealPlayers(event) {
        let playersHands = []
        const totalPlayers = event.target.value;
        for(let i=0; i<totalPlayers; i++) {
            let randomCard1 = this.state.deck[Math.floor(Math.random() * this.state.deck.length)];
            this._removeCardFromDeck(randomCard1);
            let randomCard2 = this.state.deck[Math.floor(Math.random() * this.state.deck.length)];
            this._removeCardFromDeck(randomCard2);

            let hand = [randomCard1, randomCard2];
            playersHands.push({player: hand});

            this.setState({ playersHands: playersHands })
        }
    }

    _removeCardFromDeck(card) {
        var i = this.state.deck.indexOf(card);
        if(i !== -1) {
            this.state.deck.splice(i, 1);
        }
    }
}

export default CardsDeck;

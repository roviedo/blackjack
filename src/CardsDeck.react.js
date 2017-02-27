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
        this._hit = this._hit.bind(this);
        this._stand = this._stand.bind(this);
    }

    render() {
        let playerHandsComponents;
        if (this.state.playersHands) {
            playerHandsComponents = this.state.playersHands.map((hand, index) => {
                return (
                    <div key={index}>Player { index }
                        <div className="hand">Card 1: {hand.player[0]}</div>
                        <div className="hand">Card 2: {hand.player[1]}</div>
                        <button onClick={this._hit} value={index}>Hit</button>
                        <button onClick={this._stand} value={index}>Stand</button>
                    </div>
                )
            });
        }

        return (
            <div className="CardsDeck">
                Number of players:
                <input value={this.state.inputValue} onChange={this._dealPlayers}/>
                <div>{ playerHandsComponents }</div>
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
            let randomCard1 = this._getCard();
            this._removeCardFromDeck(randomCard1);
            let randomCard2 = this._getCard();
            this._removeCardFromDeck(randomCard2);

            let hand = [randomCard1, randomCard2];
            playersHands.push({player: hand});

            this.setState({ playersHands: playersHands })
        }
    }

    _getCard() {
        return this.state.deck[Math.floor(Math.random() * this.state.deck.length)];
    }

    _removeCardFromDeck(card) {
        var i = this.state.deck.indexOf(card);
        if(i !== -1) {
            this.state.deck.splice(i, 1);
        }
    }

    _hit(event) {
        let card = this._getCard();
        this._removeCardFromDeck(card);
        console.log(card);
        //add card to players hand
    }

    _stand(event) {
        console.log('stand', event.target.value);
        //lock players moves
    }
}

export default CardsDeck;

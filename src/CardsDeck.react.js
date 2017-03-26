import React, { Component } from 'react';
import './App.css';

class CardsDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
          deck: this._makeDeck(),
          dealerHand: [],
          playerHand: []
        };
        this._dealPlayers = this._dealPlayers.bind(this);
        this._hit = this._hit.bind(this);
        this._stand = this._stand.bind(this);
    }

    componentDidMount() {
        this._dealPlayers();
    }

    render() {
        let playerHand;
        let dealer;
        let player;
        if (this.state.playerHand && this.state.dealerHand) {
            dealer = (
                <div> Dealer
                    <div className="hand">Card 1: {this.state.dealerHand[0]}</div>
                    <div className="hand">Card 2: {this.state.dealerHand[1]}</div>
                </div>
            );
            playerHand = this.state.playerHand.map((card, index) => {
                return (
                    <div className="hand">Card { index+1 }: { card }</div>
                )
            });

            player = (
                <div> Player
                    { playerHand }
                    <button onClick={this._hit}>Hit</button>
                    <button onClick={this._stand}>Stand</button>
                </div>
            )
        }

        return (
            <div className="CardsDeck">
                Player vs. Dealer
                <div>
                    { dealer }
                    { player }
                </div>
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

    _dealPlayers() {
        this.setState({
            dealerHand: this._getHand(),
            playerHand: this._getHand()
        });
    }

    _getHand() {
        let randomCard1 = this._getCard();
        this._removeCardFromDeck(randomCard1);
        let randomCard2 = this._getCard();
        this._removeCardFromDeck(randomCard2);

        return [randomCard1, randomCard2];
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
        // Dealer must draw on 16 and stand on all 17's" are printed on the table.
        let card = this._getCard();
        this._removeCardFromDeck(card);
        let playerHand = this.state.playerHand.slice();
        playerHand.push(card);
        //add card to players hand
        this.setState({ playerHand })
    }

    _stand(event) {
        console.log('stand', event.target.value);
        //lock players moves
        // calculate winner
    }
}

export default CardsDeck;

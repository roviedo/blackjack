import React, { Component } from 'react';
import './App.css';

class CardsDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
          deck: this._makeDeck(),
          dealerHand: [],
          playerHand: [],
          winner: null
        };
        this._dealPlayers = this._dealPlayers.bind(this);
        this._hit = this._hit.bind(this);
        this._stand = this._stand.bind(this);
    }

    componentDidMount() {
        this._dealPlayers();
    }

    render() {
        let dealerHand;
        let playerHand;
        let dealer;
        let player;
        if (this.state.playerHand && this.state.dealerHand) {
            dealerHand = this.state.dealerHand.map((card, index) => {
                let cardStr = card.rank+" of "+card.suit;
                return (
                    <div key={ index } className="hand">Card { index+1 }: { cardStr }</div>
                )
            });

            playerHand = this.state.playerHand.map((card, index) => {
                let cardStr = card.rank+" of "+card.suit;
                return (
                    <div key={ index } className="hand">Card { index+1 }: { cardStr }</div>
                )
            });

            dealer = (
                <div> Dealer
                    { dealerHand }
                </div>
            );

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
        /*TODO: Different data structure for deck
            [
                {rank: "A", suit: "Clubs", value: 1},
                {rank: "Q", suit: "Spades", value: 12}
            ]
        */
        let deck = [];
        const rankValues = {
            "A": 1, "2": 2, "3": 3, "4": 4,
            "5": 5, "6": 6, "7": 7, "8": 8,
            "9": 9, "10": 10, "J": 11, "Q": 12,
            "K": 13
        }
        const ranks = [
            "A", "2", "3", "4", "5",
            "6", "7", "8", "9", "10",
            "J", "Q", "K"
        ];
        const suits = ["Clubs", "Spades", "Hearts", "Diamonds"];

        let card = function(rank) {
            for(let i=0; i<suits.length;i++) {
                deck.push({
                    rank: rank,
                    suit: suits[i],
                    value: rankValues[rank]
                })
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
        }, () => {this._calculateWinner()});
    }

    _getHand() {
        let randomCard1 = this._getCard();
        this._removeCardFromDeck(randomCard1);
        let randomCard2 = this._getCard();
        this._removeCardFromDeck(randomCard2);

        return [randomCard1, randomCard2];
    }

    _getCard() {
        return this.state.deck[
            Math.floor(Math.random() * this.state.deck.length)
        ];
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
        let playerHand = this.state.playerHand.slice();
        playerHand.push(card);
        this.setState({ playerHand }, () => {
            this._calculateWinner()
        });
    }

    _calculateWinner() {
        // Dealer must draw on 16 and stand on all 17's" are printed on the table.
        let winner = null;
        let dealerScore = this._getPlayerScore(this.state.dealerHand);
        let playerScore = this._getPlayerScore(this.state.playerHand);
        console.log('dealerScore', dealerScore, 'playerScore', playerScore);
        if (playerScore == 21) {
            winner = 'player';
        } else if (dealerScore == 21) {
            winner = 'dealer';
        }

        this.setState({ winner });
    }

    _getPlayerScore(hand) {
        let score = 0;
        for (let card in hand) {
            score += hand[card].value
        }

        return score;
    }

    _stand() {
        this._calculateWinner();
    }
}

export default CardsDeck;

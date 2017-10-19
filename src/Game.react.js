import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';
import spadesImg from './images/spades.png';
import clubsImg from './images/clubs.png';
import heartsImg from './images/hearts.png';
import diamondsImg from './images/diamonds.png';


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
          deck: this._makeDeck(),
          turn: null,
          isPlayerActive: true,
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

    componentDidUpdate() {
        if (this.state.turn === 'dealer') {
            this._dealerPlay();
        }
    }

    render() {
        let dealerHand;
        let playerHand;
        let dealer;
        let player;
        let playerActions;
        if(this.state.winner) {
            const winner = this.state.winner
            return (
                <div>
                    The winner is the: { winner }
                </div>
            )
        }

        if (this.state.playerHand && this.state.dealerHand) {
            const dealerHandLength = this.state.dealerHand.length;
            dealerHand = this.state.dealerHand.map((card, index) => {
                if (dealerHandLength-1 === index) {
                    return (
                        <div key={ index } className="card">
                            <div className="cardTopLeft">
                                { card.rank }
                                { this._getImage(card.suit) }
                            </div>
                            <div className="cardBottomRight">
                                { card.rank }
                                { this._getImage(card.suit) }
                            </div>
                        </div>
                    )
                }

                return (
                    <div key={ index } className={classNames("card", "card-background")} />
                )
            });

            playerHand = this.state.playerHand.map((card, index) => {
               return (
                    <div key={ index } className="card">
                        <div className="cardTopLeft">
                            { card.rank }
                            { this._getImage(card.suit) }
                        </div>
                        <div className="cardBottomRight">
                            { card.rank }
                            { this._getImage(card.suit) }
                        </div>
                    </div>
                )
            });
            if (this.state.isPlayerActive) {
                playerActions = (
                    <div>
                        <button className="button" onClick={this._hit}>Hit</button>
                        <button className="button" onClick={this._stand}>Stand</button>
                    </div>
                )
            }
            dealer = (
                <div className="deck">
                    { this._renderHand(dealerHand) }
                </div>
            );

            player = (
                <div className="deck">
                    { this._renderHand(playerHand) }
                </div>
            )
        }

        return (
            <div className="Game">
                Player vs. Dealer
                <div>
                    Dealer
                    { dealer }
                    Player
                    { player }
                    { playerActions }
                </div>
            </div>
        );
    }

    _getImage(suit) {
        let imageUrl;
        if (suit === 'S') {
            imageUrl = spadesImg;
        } else if (suit === 'C') {
            imageUrl = clubsImg;
        } else if (suit === 'D') {
            imageUrl = diamondsImg;
        } else if (suit === 'H') {
            imageUrl = heartsImg;
        }
        return (
            <img src={imageUrl} alt="" />
        );
    }

    _renderHand(hand) {
        return hand;
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
            "9": 9, "10": 10, "J": 10, "Q": 10,
            "K": 10
        }
        const ranks = [
            "A", "2", "3", "4", "5",
            "6", "7", "8", "9", "10",
            "J", "Q", "K"
        ];
        const suits = ["C", "S", "H", "D"];

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
            playerHand: this._getHand(),
            turn: 'player'
        }, () => { this._calculateWinner()});
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

    _hit() {
        let playerHand = this.state.playerHand.slice();
        const newHand = this._dealCard(playerHand);
        let playerScore = this._getPlayerScore(this.state.playerHand);
        if (playerScore >= 21) {
            this._stand();
        } else {
            this.setState({ playerHand: newHand, turn: 'dealer' }, () => {
                this._dealerPlay()
            });
        }
    }

    _stand() {
        this.setState(
            {
                turn: 'dealer',
                isPlayerActive: false
            }
        );
    }

    _dealerPlay() {
        let dealerScore = this._getPlayerScore(this.state.dealerHand);
        if (dealerScore <= 16) {
            let dealerHand = this.state.dealerHand.slice();
            const newHand = this._dealCard(dealerHand);
            this.setState({ dealerHand: newHand, turn: 'player' }, () => {
                this._calculateWinner()
            });
        } else {
            this.setState({ turn: 'player' }, () => {
                this._calculateWinner()
            });
        }
    }

    _dealCard(hand) {
        let card = this._getCard();
        this._removeCardFromDeck(card);
        hand.push(card);
        return hand;
    }

    _getPlayerScore(hand) {
        let score = 0;
        for (let card = 0; card < hand.length; card++) {
            score += hand[card].value;
        }

        return score;
    }

    _calculateWinner() {
        // Dealer must draw on 16 and stand on all 17's are printed on the table.
        let winner = null;
        let dealerScore = this._getPlayerScore(this.state.dealerHand);
        let playerScore = this._getPlayerScore(this.state.playerHand);
        console.log('dealerScore', dealerScore, 'playerScore', playerScore);
        if (playerScore > 21 && dealerScore > 21) {
            if (playerScore > dealerScore) {
                winner = 'dealer';
            } else {
                winner = 'player';
            }
        } else if (!this.state.isPlayerActive) {
            if (playerScore === 21) {
                winner = 'player';
            } else if (dealerScore === 21) {
                winner = 'dealer';
            } else if (dealerScore < 21 && playerScore > 21) {
                winner = 'dealer';
            } else if (dealerScore <= 16) {
                this._dealerPlay();
            } else if (dealerScore <= 20 && playerScore <= 20) {
                if (dealerScore > playerScore) {
                    winner = 'dealer';
                } else {
                    winner = 'player';
                }
            } else {
                console.log('wierd case, letting player win');
                winner = 'player';
            }
        }
        this.setState({ winner });
    }
}

export default Game;

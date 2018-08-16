import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'

function Square(props) {
    return (
        <div className='col-4 col-sm-2 px-0 border border-dark'>
            <div className='square'>
                <span onClick={props.onClick}>
                    {props.value}
                </span>
            </div>
        </div>
    )
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xTurn: true,
            gameOver: false,
            status: "Next player is X"
        };
    }

    handleClick (loc) {
        const squares = this.state.squares.slice();
        if (squares[loc] || this.state.gameOver)
            return;

        squares[loc] = (this.state.xTurn ? 'X' : 'O');

        this.calculateWinner(squares);
    }

    calculateWinner (squares) {
        let gameOver, status;

        for (let i = 0; i < 3; i++) {
            let r = i*3;
            if (
                squares[r]
                && (squares[r] == squares[r + 1] && squares[r] == squares[r + 2])
            ) {
                // check each row for a winner
                gameOver = true;
                status = "Winner: " + squares[r];
                break;
            } else if (
                squares[i]
                && (squares[i] == squares[3 + i] && squares[i] == squares[6 + i])
            ) {
                // then check each column
                gameOver = true;
                status = "Winner: " + squares[i];
                break;
            } else if (
                squares[4]
                && ((squares[4] == squares[0] && squares[4] == squares[8])
                    || (squares[4] == squares[2] && squares[4] == squares[6]))
            ) {
                // then check diagonals
                gameOver = true;
                status = "Winner: " + squares[4];
                break;
            } else if (squares.indexOf(null) == -1) {
                // if there is no winner but the board is filled, its a draw
                gameOver = true;
                status = "Draw";
            } else {
                // otherwise the game goes on
                gameOver = false;
                status = "Next player is " + (this.state.xTurn ? "O" : "X");
            }
        }

        this.setState({
            squares: squares,
            xTurn: !this.state.xTurn,
            gameOver: gameOver,
            status: status
        });
    }

    resetBoard () {
        this.setState({
            squares: Array(9).fill(null),
            xTurn: true,
            gameOver: false,
            status: "Next player is X"
        });
    }

    createBoard () {
        let board = [];

        for (let i = 0; i < 3; i++) {
            let row = [];

            for (let j = 0; j < 3; j++) {
                let loc = i*3 + j;
                row.push(
                    <Square key={'loc' + loc}
                    value={this.state.squares[loc]}
                    onClick={() => this.handleClick(loc)} />
                )
            }

            board.push(<div key={'row' + i} className='row'>{row}</div>);
        }

        return board;
    }

    render() {
        return (
            <div className='container p-3'>
                <h2>{this.state.status}</h2>
                <div className='my-3'>{this.createBoard()}</div>
                <button className='btn btn-primary btn-lg'
                    onClick={() => this.resetBoard()}>
                    Reset Board
                </button>
            </div>
        )
    }
}

ReactDOM.render(<Board />, document.getElementById('root'));

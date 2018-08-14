import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'

function Square(props) {
    return (
        <div className='col-2 square border border-dark'>
            <span onClick={props.onClick}>
                {props.value}
            </span>
        </div>
    )
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(3).fill( Array(3).fill(null) ),
            xTurn: true
        };
    }

    handleClick (row, col) {
        const squares = this.state.squares.slice();
        if (squares[row][col])
            return;

        squares[row][col] = (this.state.xTurn ? 'X' : 'O');

        this.setState({
            squares: squares,
            xTurn: !this.state.xTurn
        });
    }

    resetBoard () {
        this.setState({
            squares: Array(3).fill( Array(3).fill(null) ),
            xTurn: true
        });
    }

    createBoard () {
        let board = [];

        for (let i = 0; i < 3; i++) {
            let row = [];

            for (let j = 0; j < 3; j++) {
                row.push(
                    <Square key={String(i) + String(j)}
                        value={this.state.squares[i][j]}
                        onClick={() => this.handleClick(i, j)} />
                    )
            }

            board.push(<div key={i} className='row board-row'>{row}</div>);
        }

        return board;
    }

    render() {
        const status = "Next player is " + (this.state.xTurn ? 'X' : 'O');
        return (
            <div className='container p-3'>
                <div className='status'>{status}</div>
                <div className='my-3'>{this.createBoard()}</div>
                <button className='btn btn-primary' onClick={() => this.resetBoard()}>
                    Reset Board
                </button>
            </div>
        )
    }
}

ReactDOM.render(<Board />, document.getElementById('root'));

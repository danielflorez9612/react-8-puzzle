import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Solver} from './heuristics/Solver';
import {Solution} from './heuristics/solutions/Solution';

class Square extends React.Component{

    render() {
        return (
            <button className='cell' >
                {this.props.value}
            </button>
        );

    }

}
class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          matrix:props.matrix
        };
    }
    renderRow(i) {
        return (
            <div key={i}>
                <div className="board-row">
                    {this.renderCell(i,0,this.state.matrix[i][0])}
                    {this.renderCell(i,1,this.state.matrix[i][1])}
                    {this.renderCell(i,2,this.state.matrix[i][2])}
                </div>
            </div>

        );
    }
    renderBoard() {
        let rows =[];
        for(let i = 0; i<3;i++){
            rows.push(this.renderRow(i));
        }
        return (
            <div>
                <div className="board">
                    {rows}
                </div>
                <button className='action' onClick={()=>this.solve()}>
                    SOLVE
                </button>
            </div>
        );
    }
    render() {
        return this.renderBoard();
    }
    handleClick(row,column) {
        this.renderChangeValue(row,column);
    };
    changeValues(value1, value2){
        function isNumber(value) {
            return parseInt(value,10)>=0&&parseInt(value,10)<10;
        }

        if(value1!==value2 && isNumber(value1) && isNumber(value2)){
            const otherMatrix =this.state.matrix.slice().map(row => {
                return row.map(value => {
                    // eslint-disable-next-line
                    if(value==value1) {
                        return value2;
                        // eslint-disable-next-line
                    }else if(value==value2){
                        return value1;
                    }else{
                        return value;
                    }
                })
            });
            this.setState( {
                matrix:otherMatrix
            });
        }
    }
    renderChangeValue(row,column) {
        let elemValue = this.state.matrix[row][column];
        if(elemValue>0){
            let nextValue = prompt('Change value', elemValue);
            this.changeValues(elemValue,nextValue);
        }
    }

    renderCell(row, column, number) {
        const show = number>0?Number(number):'-';
        return (
            <div className="cell-container" onClick={()=> this.handleClick(row,column)}>
                <Square row={row} column={column} value={show} />
            </div>
        );
    }
    solve() {
        Solution.printSolution(Solver.solveMatrix(this.state.matrix.slice()));
    }
}
class App extends React.Component {
    static matrix:number[][]=[[2,8,3],[0,1,4],[7,6,5]];
    render() {
        return (
            <Board matrix={App.matrix} />
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
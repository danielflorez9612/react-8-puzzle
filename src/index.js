import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Solver} from './heuristics/Solver';
import {Solution} from './heuristics/solutions/Solution';
import {State} from './heuristics/solutions/State';
import 'animate.css';

class Square extends React.Component{

    render() {
        return (
            <button className='cell animated fadeIn' >
                {this.props.value}
            </button>
        );

    }

}
class Board extends React.Component{
    zeroLocation() {
        return Solver.findNumber(this.state.matrix,0);
    }
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
                <div className="button-container">
                    <button className='action' onClick={()=>this.solveDisorder()}>
                        SOLVE DISORDER
                    </button>
                    <button className='action' onClick={()=>this.solveManhattan()}>
                        SOLVE MANHATTAN
                    </button>
                </div>
            </div>
        );
    }
    render() {
        return this.renderBoard();
    }
    changeValues(value1, value2):[][] {
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
            return otherMatrix;
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
            <div className="cell-container"
                 onContextMenu={(e)=> {
                    e.preventDefault();
                    this.renderChangeValue(row,column);
                }}
                 onClick={()=>this.handleClick(row,column)}
            >
                <Square row={row} column={column} value={show} />
            </div>
        );
    }
    solveDisorder() {
        let solution = Solver.solveDisorder(this.state.matrix.slice());
        solution.solutionName='Disorder';
        Solution.printSolution(solution);
    }
    solveManhattan() {
        let solution = Solver.solveManhattan(this.state.matrix.slice());
        solution.solutionName='Manhattan';
        Solution.printSolution(solution);
    }

    handleClick(row, column) {
        if(this.isNextEmpty(row,column)) {
            this.checkWin(this.changeValues(this.state.matrix[row][column],0));
        }
    }

    isNextEmpty(row, column) {
        const zeroLoc = this.zeroLocation();
        return (row-1===zeroLoc.i && column===zeroLoc.j)
        || (row+1===zeroLoc.i&& column===zeroLoc.j)
        || (column-1===zeroLoc.j && row===zeroLoc.i )
        || (column+1===zeroLoc.j && row===zeroLoc.i );
    }

    checkWin(matrix) {
        // console.log("checking win");
        // console.table(this.state.matrix);
        if(new State(matrix).equals(new State(Solver.finalState))){
            alert("Contratulations you win");
        }
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
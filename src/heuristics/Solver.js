import {AStar} from './solutions/Heuristics';
import {State} from './solutions/State';
import {Solution} from './solutions/Solution';

export class Solver {
    static finalState: number[][] = [[1,2,3],[8,0,4],[7,6,5]];
    static disordered = (step:State):number=>{
        let matrix = step.matrix;
        let sum = 0;
        for(let i = 0; i< matrix.length; i++) {
            for(let j = 0; j< matrix[i].length; j++) {
                if(matrix[i][j]!==Solver.finalState[i][j]){
                    sum++;
                }
            }
        }
        // console.table(step.matrix);
        // console.log(sum+" fichas");
        return sum;
    };
    static manhattanSum = (step:State):number=>{
        let matrix = step.matrix;
        let sum = 0;
        for(let i = 0; i< matrix.length; i++) {
            for(let j = 0; j< matrix[i].length; j++) {
                if(matrix[i][j]!==Solver.finalState[i][i]){
                    sum++;
                }
            }
        }
        return sum;
    };
    static solveMatrix(matrix:[][]): Solution {
        return new AStar(matrix,Solver.finalState, Solver.disordered).solution;
    }
}
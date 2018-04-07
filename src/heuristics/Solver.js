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
        if(matrix) {
            for(let i = 0; i< matrix.length; i++) {
                for(let j = 0; j< matrix[i].length; j++) {
                    const location = Solver.findNumber(Solver.finalState,matrix[i][j]);
                    if(location){
                        sum+=Math.abs(i-location.i)+Math.abs(j-location.j);
                    }else {
                        console.log("couldn't find "+matrix[i][j]+" in ");
                        console.table(Solver.finalState);
                    }
                }
            }
        }
        return sum;
    };
    static findNumber(matrix,number) {
        for (let i = 0; i< matrix.length; i++){
            for (let j = 0; j< matrix[0].length; j++){
                if(matrix[i][j]===number){
                    return {i:i,j:j};
                }
            }
        }
        return null;
    }
    static solveDisorder(matrix:[][]): Solution {
        return new AStar(matrix,Solver.finalState, Solver.disordered).solution;
    }
    static solveManhattan(matrix:[][]): Solution {
        return new AStar(matrix,Solver.finalState, Solver.manhattanSum).solution;
    }
}
import {State} from './State';
import {Solver} from '../Solver';

export class Solution {
    steps:State[];
    time:number;
    solutionName:string='';
    static printSolution(solution:Solution) {
        console.log(solution.solutionName);
        if(solution.steps && solution.steps.find(value => value.equals(new State(Solver.finalState)))){
            console.log("Steps: "+(solution.steps.length-1));
            console.log("In "+solution.time+"ms");
            solution.steps.forEach(step => console.table(step.matrix));
        } else{
            console.log("There is no better solution found in "+solution.time+"ms");
        }
    }
}
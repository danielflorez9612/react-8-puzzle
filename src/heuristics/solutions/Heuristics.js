import {Solution} from './Solution';
import {State} from './State';

export class AStar {
    _initialState:State;
    _finalState:State;

    _heuristic:(state:State)=>number;
    _solution:Solution;

    visitedStates:State[]=[];
    constructor(initialState: [][], finalState: [][], heuristic:(state:State)=>number) {
        this._heuristic = heuristic;
        this._initialState= new State(initialState);
        this._finalState= new State(finalState);
        this._solution = this.algorithm();
    }

    get solution(): Solution {
        return this._solution;
    }

    algorithm() :Solution {
        this.visitedStates = [];
        let t1 = performance.now();
        let steps = this.recursiveAlgorithm(this._initialState);
        let t2 = performance.now();
        return {
            steps:steps,
            time:t2-t1
        };
        // console.log(steps);

    }
    recursiveAlgorithm(currentStep:State) : State[] {
        let steps:State[] = [];
        Object.freeze(currentStep);
        // console.table(currentStep.matrix);
        if(!currentStep.equals(this._finalState)){
            let possibleMovements = currentStep.getPossibleMovements(this.visitedStates);
            // console.log(possibleMovements);
            // console.table(currentStep.matrix);
            const nextStep: State= possibleMovements
                .reduce((previousValue, currentValue) => {
                    let returnValue = previousValue;
                    if(previousValue && currentValue) {
                        if (this._heuristic(currentValue) < this._heuristic(previousValue)){
                            returnValue =  currentValue;
                        }
                    }
                    return returnValue;
                 });
            this.visitedStates.push(currentStep);
            // console.log("visited states");
            // this.visitedStates.forEach(value => console.table(value.matrix));
            if(nextStep){
                steps.push(nextStep);
                let recursiveSolution = this.recursiveAlgorithm(nextStep);
                // console.log(recursiveSolution);
                Array.prototype.push.apply(steps,recursiveSolution);
                // console.log(steps);
            }
        }
        // console.log(steps);
        return steps;
    }
}
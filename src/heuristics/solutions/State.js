export class State {
    matrix:number[][];
    constructor(matrix:number[][]){
        this.matrix = matrix;
    }
    getPossibleMovements(visitedSteps:State[]):State[] {
        let states:State[]=[];
        let zero=false;
        // console.table(this.matrix);
        for(let i = 0; i< this.matrix.length&&!zero; i++){
            for (let j = 0; j< this.matrix[i].length &&!zero; j++) {
                zero = this.matrix[i][j]===0;
                if(zero) {
                    if(State.canMoveUp(i)) {
                        // console.log("can move up");
                        const state = State.move(this.matrix.slice(),i,j,i-1,j);
                        if(!visitedSteps.find(value => value.equals(state))){
                            // console.log("moving up");
                            states.push(state);
                        }
                    }
                    if(this.canMoveDown(i)){
                        // console.log("can move down");
                        const state = (State.move(this.matrix.slice(),i,j,i+1,j));
                        if(!visitedSteps.find(value => value.equals(state))){
                            // console.log("moving down");
                            states.push(state);
                        }
                    }
                    if(State.canMoveLeft(j)){
                        // console.log("can move left");
                        const state = (State.move(this.matrix.slice(),i,j,i,j-1));
                        if(!visitedSteps.find(value => value.equals(state))){
                            // console.log("moving left");
                            states.push(state);
                        }
                    }
                    if(this.canMoveRight(j)){
                        // console.log("can move right");
                        const state = (State.move(this.matrix.slice(),i,j,i,j+1));
                        if(!visitedSteps.find(value => value.equals(state))){
                            // console.log("moving right");
                            states.push(state);
                        }
                    }
                }
            }
        }
        // console.log(states);
        // console.table(this.matrix);
        return states;
    }
    static canMoveUp(currentRow:number) {
        return currentRow>0;
    }
    canMoveDown(currentRow:number) {
        return currentRow<this.matrix.length;
    }
    canMoveRight(currentColumn:number) {
        return currentColumn<this.matrix.length;
    }
    static canMoveLeft(currentColumn:number) {
        return currentColumn>0;
    }

    static move(matrix,i,j,newI,newJ):State {
        // console.table(matrix);
        let currentNumber= matrix[i][j];
        let numberToChange= matrix[newI][newJ];
        return new State(State.changeValues(matrix,currentNumber,numberToChange));
    }
    static changeValues(matrix,value1, value2): [][]{
        if(value1!==value2 ){
            return matrix.slice().map(row => {
                return row.map(value => {
                    if(value===value1) {
                        return value2;
                    }else if(value===value2){
                        return value1;
                    }
                    return value;
                })
            });
        }
    }
    equals(otherState:State) {
        // Warn if overriding existing method
        if(!Array.prototype.equals){
            // attach the .equals method to Array's prototype to call it on any array
            Array.prototype.equals = function (array) {
                // if the other array is a falsy value, return
                if (!array)
                    return false;

                // compare lengths - can save a lot of time
                if (this.length !== array.length)
                    return false;

                for (let i = 0, l=this.length; i < l; i++) {
                    // Check if we have nested arrays
                    if (this[i] instanceof Array && array[i] instanceof Array) {
                        // recurse into the nested arrays
                        if (!this[i].equals(array[i]))
                            return false;
                    }
                    else if (this[i] !== array[i]) {
                        // Warning - two different object instances will never be equal: {x:20} != {x:20}
                        return false;
                    }
                }
                return true;
            }
        }

        // Hide method from for-in loops
        Object.defineProperty(Array.prototype, "equals", {enumerable: false});
        return this.matrix.equals(otherState.matrix);
    }
}
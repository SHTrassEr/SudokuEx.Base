///<reference path="../SudokuEx.Bin/DefinitelyTyped/underscore/underscore.d.ts" />
///<reference path="./ISudokuSolver.ts" />
///<reference path="./BlockListInfo.ts" />
///<reference path="./SudokuUtils.ts" />
///<reference path="./SudokuField.ts" />

module SudokuEx.Base {

    class SudokuSolverField {
        private allValueList: number[]; 
        private blockListInfo: BlockListInfo;
        private sudokuField: SudokuField;

        constructor () {
        }

        public setSudokuField(sudokuField: SudokuField): void {
            this.sudokuField = sudokuField;
            this.allValueList = _.range(1, sudokuField.getMaxValue() + 1);
            this.blockListInfo = BlockListInfo.getInstance(this.sudokuField.getDimension());
        }

        public setCellValue(cellID: number, value: number): void {
            this.sudokuField.setCellByID(cellID, value);
        }

        public getVariantListForCell(cellID: number): number[] {
            var blockList = this.blockListInfo.getBlockListByCellID(cellID);
            var usedValues = [];
            _.each(blockList, (block) => {
                _.each(block, (cellID) => usedValues.push(this.sudokuField.getCellById(cellID)))
            }, this);
            return _.difference(this.allValueList, usedValues);
        }

        public getField(): number[] {
            return this.sudokuField.getField();
        }

        public getCellsCount(): number {
            return this.sudokuField.getCellsCount();
        }

        public getCellById(cellID: number): number {
            return this.sudokuField.getCellById(cellID);
        }

        public check(): boolean {
            return this.sudokuField.check();
        }
    }


    enum SolverStatus {
        modified,
        notModified,
        invalid,
        solved
    };

    export class SudokuSolver implements ISudokuSolver {
        private history: number[]; 
        private currentSudokuSolver: SudokuSolverField;
        private solutionList: number[][] = [];
        private maxSolutionsCount: number;

        constructor(field: number[]) {
            this.history = [];
            var sudokuField = new SudokuField();
            sudokuField.setField(field);
            this.currentSudokuSolver = new SudokuSolverField();
            this.currentSudokuSolver.setSudokuField(sudokuField);
        }

        public findSolution(): boolean {
            return this.findAllSolutions(1);
        }

        public findAllSolutions(maxSolutionsCount: number = 0): boolean {
            this.maxSolutionsCount = maxSolutionsCount;
            this.solutionList = [];
            this.trySolve()
            return (this.solutionList.length > 0);
        }

        public getSolution(): number[] {
            if (this.solutionList.length > 0) {
                return this.solutionList[0];
            }

            throw "Solution has not been found";
        }

        public getSolutionsCount(): number {
            return this.solutionList.length;
        }

        public getAllSolutions(): number[][] {
            return this.solutionList;
        }

        private trySolve(): SolverStatus {
            var solverStatus = SolverStatus.modified;
            while(solverStatus == SolverStatus.modified) {
                solverStatus = this.iterate();
            }

            if (solverStatus == SolverStatus.notModified) {
                if (this.currentSudokuSolver.check()) {
                    solverStatus = SolverStatus.solved;
                } else {
                    solverStatus = this.iterate(true);
                }
            }

            if(solverStatus == SolverStatus.solved) {
                this.solutionList.push(this.currentSudokuSolver.getField());
            }

            return solverStatus;
        }

        private iterate(goDeeper: boolean = false): SolverStatus {
            var solverStatus = SolverStatus.notModified;
            var cellsCount = this.currentSudokuSolver.getCellsCount();

            for (var cellID = 0; cellID < cellsCount; cellID++) {
                if (this.currentSudokuSolver.getCellById(cellID) == 0) {
                    solverStatus = this.processCell(cellID, goDeeper);
                    if (solverStatus == SolverStatus.solved || solverStatus == SolverStatus.invalid) {
                        break;
                    }
                }
            }

            return solverStatus;
        }

        private processCell(cellID: number, goDeeper: boolean): SolverStatus {
            var solverStatus = SolverStatus.notModified;
            var values = this.currentSudokuSolver.getVariantListForCell(cellID);
            if (values.length == 1) {
                this.currentSudokuSolver.setCellValue(cellID, values[0]);
                this.history.push(cellID);
                solverStatus = SolverStatus.modified;
            } else if (values.length == 0) {
                solverStatus = SolverStatus.invalid;
            } else if(goDeeper && values.length > 1) {
                if (this.tryValues(cellID, values) == SolverStatus.solved) {
                    solverStatus = SolverStatus.solved;
                } else {
                    solverStatus = SolverStatus.invalid;
                }
            }

            return solverStatus;
        }

        private tryValues(cellID: number, values: number[]): SolverStatus {
            var solverStatus = SolverStatus.invalid;
            var historyLength = this.history.length;

            values.some(value => {
                this.currentSudokuSolver.setCellValue(cellID, value);
                this.history.push(cellID);
                if (cellID == 0) {
                    var i = 1;
                }
                solverStatus = this.trySolve();
                if (solverStatus == SolverStatus.solved &&
                    this.maxSolutionsCount > 0 &&
                    this.maxSolutionsCount == this.solutionList.length) {
                    return true;
                } else {
                    solverStatus = SolverStatus.invalid;
                    while (this.history.length > historyLength) {
                        this.currentSudokuSolver.setCellValue(this.history.pop(), 0);    
                    }
                    
                    return false;
                }
            }, this);

            return solverStatus;
        }
    }
}
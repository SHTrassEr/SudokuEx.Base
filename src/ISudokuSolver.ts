///<reference path="./SudokuUtils.ts" />

interface ISudokuSolver {
    findSolution(): boolean;
    findAllSolutions(maxSolutionsCount: number): boolean;
    getSolution(): number[];
    getAllSolutions(): number[][];
    getSolutionsCount(): number;
}
///<reference path="../SudokuEx.Bin/DefinitelyTyped/underscore/underscore.d.ts" />

module SudokuEx.Base {

    export class SudokuIndexUtils {
        public static getColIndex(maxValue: number, index: number): number {
            return index % maxValue;
        }

        public static getRowIndex(maxValue: number, index: number): number {
            return Math.floor(index / maxValue);
        }
    }

}
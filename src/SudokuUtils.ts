///<reference path="../SudokuEx.Bin/DefinitelyTyped/underscore/underscore.d.ts" />


module SudokuEx.Base {

    export class SudokuUtils {

        private static zeroChar = "0".charCodeAt(0);
        private static aChar = "a".charCodeAt(0);
        private static inputFilter =  /\s/g;

        public static getCellIndex(rowIndex: number, colIndex: number, maxValue: number): number {
            return rowIndex * maxValue + colIndex;
        }

        public static tryAddUniqValue(array: number[], value: number) {
            if (_.contains(array, value)) return false;
            array.push(value);
            return true;           
        }

        public static getDimenensionByMaxValue(maxValue: number): number {
            var dimension = Math.floor(Math.sqrt(maxValue));
            if (dimension * dimension != maxValue) throw "Illegal maxValue";
            if (dimension < 2) throw "dimension must be greater then 1";
            return dimension;
        }

        public static getMaxValueByCellsCount(cellsCount: number): number {
            var maxValue = Math.floor(Math.sqrt(cellsCount));
            if (maxValue * maxValue != cellsCount) throw "Illegal fieldLength";
            if (maxValue < 4) throw "maxValue must be greater then 3";
            return maxValue;
        }

        public static parse(s: string) : number[] {
            if (!s) throw "Illegal input";
            s = s.replace(SudokuUtils.inputFilter, "");
            var cellsCount = s.length;

            var maxValue = SudokuUtils.getMaxValueByCellsCount(cellsCount);
            var dimension = SudokuUtils.getDimenensionByMaxValue(maxValue);
            var field = new Array<number>(cellsCount);
            s = s.toLowerCase();

            _.times(cellsCount, charIndex => {
                var value = SudokuUtils.getValueFromChar(s.charCodeAt(charIndex));
                field[charIndex] = value;
            });

            return field;
        }

        public static getCharFromValue(c: number): number {
            if (c >= 0 && c <= 9) return c + SudokuUtils.zeroChar;
            if (c >= 10 && c <= 35) return c + SudokuUtils.aChar - 10;
            throw "invalid number: " + c;
        }

        public static getValueFromChar(c: number): number {
            if (c >= SudokuUtils.zeroChar && c <= (SudokuUtils.zeroChar + 9)) return c - SudokuUtils.zeroChar;
            if (c >= SudokuUtils.aChar && c <= (SudokuUtils.aChar + 25)) return c - SudokuUtils.aChar + 10;
            throw "invalid char number: " + c;
        }
    }
}
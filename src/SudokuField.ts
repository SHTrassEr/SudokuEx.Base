///<reference path="./ISudokuField.ts" />
///<reference path="./SudokuUtils.ts" />
///<reference path="./BlockListInfo.ts" />

///<reference path="../SudokuEx.Bin/DefinitelyTyped/underscore/underscore.d.ts" />

module SudokuEx.Base {
    export class SudokuField implements ISudokuField {
        
        private notFilledCellsCount: number;
        private cellsCount: number;
        private maxValue: number;
        private dimension:number

        private blockListInfo: BlockListInfo;
        private field: number[];

        public setField (field: number[]): void {
            this.cellsCount = field.length;
            this.notFilledCellsCount = this.cellsCount;
            this.maxValue = SudokuUtils.getMaxValueByCellsCount(this.cellsCount);
            this.dimension = SudokuUtils.getDimenensionByMaxValue(this.maxValue);
        
            this.blockListInfo = BlockListInfo.getInstance(this.dimension);

            this.field = new Array<number>(this.cellsCount);
            _.times(this.cellsCount, cellID => this.field[cellID] = 0, this);
            _.times(this.cellsCount, cellID => this.setCellByID(cellID, field[cellID]), this);

        }

        public getDimension(): number {
            return this.dimension;
        }

        public getMaxValue(): number {
            return this.maxValue;
        }

        getCellsCount(): number {
            return this.cellsCount;
        }

        public check(): boolean {
            return (this.notFilledCellsCount == 0) && this.checkBlocks();
        }

        public setCell(rowIndex: number, colIndex: number, value: number): void
        {
            this.setCellByID(SudokuUtils.getCellIndex(rowIndex, colIndex, this.maxValue), value);
        }

        public setCellByID(cellID: number, value: number): void 
        {
            if (!this.checkCellValue(value)) throw "value must be non-negative and less or equal then dimension^2";
            if (this.field[cellID] == 0 && value != 0) {
                this.notFilledCellsCount --;
            } else if (this.field[cellID] != 0 && value == 0) {
                this.notFilledCellsCount ++;
            }

            this.field[cellID] = value;
        }

        public getCell(rowIndex: number, colIndex: number): number {
            return this.getCellById(rowIndex * this.maxValue + colIndex);
        }

        public getCellById(cellID: number): number {
            return this.field[cellID];
        }

        public getField(): number[] {
            return this.field.slice(0);
        }

        private checkBlocks(): boolean {
            var field = this.field;
            return this.blockListInfo.getBlockList().every(block => {
                var values = [];
                return block.every(cellID => SudokuUtils.tryAddUniqValue(values, this.field[cellID]), this);
                }, this);
        }

        private checkCellValue(value: number): boolean {
            return value >= 0 && value <= this.maxValue;
        }

        public copy(): SudokuField {
            var sudokuField = new SudokuField();
            sudokuField.notFilledCellsCount = this.notFilledCellsCount;
            sudokuField.cellsCount = this.cellsCount;
            sudokuField.maxValue = this.maxValue;
            sudokuField.dimension = this.dimension;
            sudokuField.blockListInfo = this.blockListInfo;
            sudokuField.field = this.getField();
            return sudokuField;
        }

    }
}
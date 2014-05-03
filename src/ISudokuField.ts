interface ISudokuField {
    setField (field: number[]): void;
    getDimension(): number;
    getMaxValue(): number;
    getCellsCount(): number;
    check(): boolean;
    setCell(rowIndex: number, colIndex: number, value: number): void
    getCell(rowIndex: number, colIndex: number): number;
    getCellById(cellID: number): number;
    getField(): number[];

    copy(): ISudokuField;
}
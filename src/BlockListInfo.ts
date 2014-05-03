///<reference path="../SudokuEx.Bin/DefinitelyTyped/underscore/underscore.d.ts" />
///<reference path="./SudokuUtils.ts" />

module SudokuEx.Base {

    export class BlockListInfo {
        private static MaxDimension = 5;
        private static Instances = new Array<BlockListInfo>(BlockListInfo.MaxDimension);

        private blockCount: number;
        private blockList:  number[][];
        private blockListHash:  number[][][];

        constructor (dimension: number) {
            var maxValue = dimension * dimension;
            this.blockCount = maxValue * 3;
            var blocks = new Array<number[]>(this.blockCount);
            var cellsCount = maxValue * maxValue;
            var blockListHash:number[][][] = new Array<number[][]>(cellsCount);
            _.times(cellsCount, cellIndex => blockListHash[cellIndex] = new Array<number[]>());

            var hashIndex = 0;

            _.times(maxValue, rowIndex => {
                var rowArray = new Array<number>(maxValue);
                var colArray = new Array<number>(maxValue);
                var squareArray = new Array<number>(maxValue);
                var squareStartRow = Math.floor(rowIndex / dimension) * dimension;
                var squareStartCol = rowIndex % dimension * dimension;
                _.times(maxValue, colIndex => {
                    rowArray[colIndex] = SudokuUtils.getCellIndex(rowIndex, colIndex, maxValue);
                    colArray[colIndex] = SudokuUtils.getCellIndex(colIndex, rowIndex, maxValue);
                    squareArray[colIndex] = SudokuUtils.getCellIndex(
                        squareStartRow + Math.floor(colIndex / dimension),
                        squareStartCol + colIndex % dimension,
                        maxValue
                        );
                    var d=blockListHash[rowArray[colIndex]];


                    blockListHash[rowArray[colIndex]].push(rowArray);
                    blockListHash[colArray[colIndex]].push(colArray);
                    blockListHash[squareArray[colIndex]].push(squareArray);
                });

                blocks[rowIndex * 3] = rowArray;
                blocks[rowIndex * 3 + 1] = colArray;
                blocks[rowIndex * 3 + 2] = squareArray;
            });

            this.blockList = blocks;
            this.blockListHash = blockListHash;
        }

        public getBlockCount(): number {
            return this.blockCount;
        }

        public getBlockList(): number[][] {
            return this.blockList;
        }

        public getBlockListByCellID(cellID: number): number[][] {
            return this.blockListHash[cellID];
        }

        public static getInstance(dimension: number): BlockListInfo {
            if (BlockListInfo.Instances[dimension]) {
                return BlockListInfo.Instances[dimension];
            }

            BlockListInfo.Instances[dimension] = new BlockListInfo(dimension);
            return BlockListInfo.Instances[dimension]
        }
    }
}
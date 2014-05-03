///<reference path="../SudokuEx.Bin/DefinitelyTyped/qunit/qunit.d.ts" />
///<reference path="../build/js/sudokuEx.base.d.ts" />


QUnit.module("SudokuUtils");

var SudokuUtils = SudokuEx.Base.SudokuUtils;

test("tryAddUniqValue", () => {
    var testArray = [];
    ok(SudokuUtils.tryAddUniqValue(testArray,1));
    ok(SudokuUtils.tryAddUniqValue(testArray,2));
    ok(!SudokuUtils.tryAddUniqValue(testArray,2));
    ok(SudokuUtils.tryAddUniqValue(testArray,3));
});

test("parse", () => {
    function checkParse(dimension: number): boolean {
        var maxNumber = dimension * dimension;
        var cellsCount = maxNumber * maxNumber;
        var inputArray = new Array<number>(cellsCount);
        _.times(cellsCount, n => inputArray[n] = SudokuUtils.getCharFromValue(n % (maxNumber + 1)));
        var field = SudokuUtils.parse(String.fromCharCode.apply(this, inputArray));
        if (field.length !== cellsCount) return false;
        var result = true;

        var currentValue = 0;
        field.forEach(cell => {
            if (currentValue === (maxNumber + 1)) currentValue = 0;
            if (cell !== currentValue++)result = false;
        });
        return result;
    }

    ok(checkParse(2), "dimension 2 is ok");
    ok(checkParse(3), "dimension 3 is ok");
    ok(checkParse(4), "dimension 4 is ok");
    ok(checkParse(5), "dimension 5 is ok");
});

var symbolsMap = [{c: "0", n:0}, {c: "1", n:1}, {c: "2", n:2}, {c: "3", n:3}, {c: "4", n:4}, {c: "5", n:5}, {c: "6", n:6}, {c: "7", n:7}, {c: "8", n:8}, {c: "9", n:9}, 
    {c: "a", n:10}, {c: "b", n:11}, {c: "c", n:12}, {c: "d", n:13}, {c: "e", n:14}, {c: "f", n:15}, {c: "g", n:16},{c: "h", n:17}, {c: "i", n:18}, {c: "j", n:19},
    {c: "k", n:20} , {c: "l", n:21}, {c: "m", n:22}, {c: "n", n:23}, {c: "o", n:24}, {c: "p", n:25}, {c: "q", n:26}];

test("getValueFromChar",() => {
    symbolsMap.forEach(p => strictEqual(SudokuUtils.getValueFromChar(p.c.charCodeAt(0)), p.n, p.c));
});

test("getCharFromValue",() => {
    symbolsMap.forEach(p => strictEqual(SudokuUtils.getCharFromValue(p.n), p.c.charCodeAt(0), p.c));
});

/*

test("getBlocks", () => {
    function checkGetBlocks(dimension: number): boolean {
        var maxNumber = dimension * dimension;
        var len = maxNumber * maxNumber;
        var inputArray = new Array<number>(len);
        _.times(len, n => inputArray[n] = SudokuUtils.getCharFromValue(0));
        var field = SudokuUtils.parse(String.fromCharCode.apply(this, inputArray));
        var blocks = SudokuUtils.getBlocks(field);

        if (blocks.length != maxNumber * 3) return false;

        blocks.forEach(block => block.forEach(cell => cell.setValue(cell.getValue() + 1)));
        if (!blocks.every(block => block.every(cell => cell.getValue() === 3))) return false;
        if (!field.every(row => row.every(cell => cell.getValue() === 3))) return false;
        return true;
    };

    ok(checkGetBlocks(2), "dimension 2 is ok");
    ok(checkGetBlocks(3), "dimension 3 is ok");
    ok(checkGetBlocks(4), "dimension 4 is ok");
    ok(checkGetBlocks(5), "dimension 5 is ok");
});

*/
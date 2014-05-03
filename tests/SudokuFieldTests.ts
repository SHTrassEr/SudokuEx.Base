///<reference path="../SudokuEx.Bin/DefinitelyTyped/qunit/qunit.d.ts" />
///<reference path="../build/js/sudokuEx.base.d.ts" />

QUnit.module("SudokuField");

var SudokuUtils = SudokuEx.Base.SudokuUtils;
var SudokuField = SudokuEx.Base.SudokuField;

test("check", () => {
    var field = SudokuUtils.parse("1234 3412 2143 4321");
    var sudokuField = new SudokuField();
    sudokuField.setField(field);
    ok(sudokuField.check());

    var field = SudokuUtils.parse("1134 3412 2143 4321");
    var sudokuField = new SudokuField();
    sudokuField.setField(field);
    ok(!sudokuField.check());

    var field = SudokuUtils.parse("1034 3412 2143 4321");
    var sudokuField = new SudokuField();
    sudokuField.setField(field);
    ok(!sudokuField.check());
});
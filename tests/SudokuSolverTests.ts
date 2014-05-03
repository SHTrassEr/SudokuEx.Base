///<reference path="../SudokuEx.Bin/DefinitelyTyped/qunit/qunit.d.ts" />
///<reference path="../build/js/sudokuEx.base.d.ts" />

QUnit.module("SudokuSolver");

var SudokuUtils = SudokuEx.Base.SudokuUtils;
var SudokuSolver = SudokuEx.Base.SudokuSolver;
var SudokuField = SudokuEx.Base.SudokuField;

var fields = [ 
    {o: SudokuUtils.parse("1234 3412 2143 4321"), 
     s: SudokuUtils.parse("1234 3412 2143 4321")},

    {o: SudokuUtils.parse("1204 3412 2143 4321"), 
     s: SudokuUtils.parse("1234 3412 2143 4321")},

    {o: SudokuUtils.parse("1004 3412 2143 4321"), 
     s: SudokuUtils.parse("1234 3412 2143 4321")},

    {o: SudokuUtils.parse("1000 3412 2143 4321"), 
     s: SudokuUtils.parse("1234 3412 2143 4321")},

    {o: SudokuUtils.parse("0000 3412 2143 4321"), 
     s: SudokuUtils.parse("1234 3412 2143 4321")},

    {o: SudokuUtils.parse("100 000 600 800 960 070 207 010 005  000 008 734 600 000 009 435 200 000  500 040 102 040 089 000 009 000 008"), 
     s: SudokuUtils.parse("194 875 623 853 962 471 267 314 985  921 658 734 678 431 259 435 297 816  586 743 192 342 189 567 719 526 348")},

    {o: SudokuUtils.parse("030007000014800000068091007000006100002318700003500000800230570000005410000100090"), 
     s: SudokuUtils.parse("239657841714823965568491327485976132692318754173542689841239576926785413357164298")},

    {o: SudokuUtils.parse("000070140200015306061030008000700053009000800070001000100040090906100002023090000"), 
     s: SudokuUtils.parse("835276149294815376761934528418769253659423817372581964187342695946158732523697481")},

    {o: SudokuUtils.parse("500010008080003410090260000030000500207000604009000020000052090042100080100030007"), 
     s: SudokuUtils.parse("523714968786593412491268753834621579217985634659347821378452196942176385165839247")},

];


test("findSolution", () => {
    fields.forEach(p => {
        var sudokuSolver = new SudokuSolver(p.o);
        ok(sudokuSolver.findSolution());
        var solved = sudokuSolver.getSolution();
        var sudokuField = new SudokuField();
        sudokuField.setField(solved);
        ok(sudokuField.check());
        deepEqual(solved, p.s);

        });
});

test("findAllSolutions", () => {
    fields.forEach(p => {
        var sudokuSolver = new SudokuSolver(p.o);
        ok(sudokuSolver.findAllSolutions());
        equal(sudokuSolver.getSolutionsCount(),1);
        var solved = sudokuSolver.getSolution();
        var sudokuField = new SudokuField();
        sudokuField.setField(solved);
        ok(sudokuField.check());
        deepEqual(solved, p.s);

        });
});

test("findSolution", () => {
    var sudokuSolver = new SudokuSolver(SudokuUtils.parse("10 00 0000 0000 0000"));
    ok(sudokuSolver.findSolution());
    var solved = sudokuSolver.getSolution();
    var sudokuField = new SudokuField();
    sudokuField.setField(solved);
    ok(sudokuField.check());
});

test("findAllSolutions", () => {
    var sudokuSolver = new SudokuSolver(SudokuUtils.parse("023400789056000123789000456034567000067891000891234000045000912078000345912000678"));
    ok(sudokuSolver.findAllSolutions());
    var solved = sudokuSolver.getSolution();
    var sudokuField = new SudokuField();
    sudokuField.setField(solved);
    ok(sudokuField.check());
});
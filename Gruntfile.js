module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    var fs = require("fs");

    var buildRoot = 'build/';

    grunt.initConfig({
        clean: {
            build: [buildRoot]
        },
        shell: {
            server: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: "tsc src/server/app.ts -m commonjs --out build/app.js --outDir build"
            }
        },
        copy: {
            qunit: {
                files: [ { expand: true, cwd: 'SudokuEx.Bin/qunit/', src: ['**'], dest: buildRoot + 'qunit' } ]
            },
            underscore: {
                files: [ { expand: true, cwd: 'SudokuEx.Bin/underscore/', src: ['**'], dest: buildRoot + 'underscore' } ]
            },
            testsHtml: {
                files: [ { expand: true, cwd: 'tests', src: ['tests.html'], dest: buildRoot } ]
            }
        },
        typescript: {
            core: {
                src: ['src/**/*.ts'],
                dest: buildRoot + "/js/sudokuEx.base.js",
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourcemap: true,
                    declaration: true
                }

            },
            tests: {
                src: ['tests/**/*.ts'],
                dest: buildRoot + "/tests/sudokuEx.base.tests.js",
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourcemap: false
                }

            }
        },
        qunit: {
            all: [buildRoot + 'tests.html']
        }
    });

    grunt.registerTask('default', ['typescript:core', 'typescript:tests', 'copy:qunit','copy:underscore', 'copy:testsHtml', 'qunit:all']);
};
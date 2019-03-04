'use strict';

const Interpreter = require('./src/Interpreter');

// 1. Lexical Analysis
//    - Breaks input into elements (Lexemes) and generates a list of tokens.

// 2. Syntax Analysis
//    - Generates an AST (Abstract Syntax Tree).

// AST:
// identifier: type, startposition, endposition, value, body
// operator: type, start, end, left, right, value
// literal: type, start, end, value
// seperator -> creates a block: type, start, end, value
// string -> does not delete whitespace inside of "...", type, start, end, value

const testString = `a: 42 and b: 3`;

const interpreter = new Interpreter(testString).start();
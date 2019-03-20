'use strict';

const Tokenizer = require('./Tokenizer');
const TreeBuilder = require('./TreeBuilder');
/*
    This is the starting point of the language interpreter,
    it catches the input and passes it on to the tokenizer and
    hands the parsed output to a return statement as json object.
*/

class Interpreter
{
    constructor(input)
    {
        this.input = input;
        this.tokens = [  ];
    }

    start()
    {
        const tokenizer = new Tokenizer(this.input);
        this.tokens = tokenizer.readInput();

        const treeBuilder = new TreeBuilder().createTree(this.tokens, 0);

        return JSON.stringify(treeBuilder);
    }
}

module.exports = Interpreter;

'use strict';

const Tokenizer = require('./Tokenizer');
const Parser = require('./Parser');

/*
    This is the starting point of the language interpreter,
    it catches the input and passes it on to the tokenizer and
    hands the parsed output to a return statement as json object.
*/

module.exports = class Interpreter
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

        const parser = new Parser(this.tokens, this.input);

        return JSON.stringify(parser.parseTokens());
    }
}

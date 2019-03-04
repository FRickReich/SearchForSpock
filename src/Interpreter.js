'use strict';

const Tokenizer = require('./Tokenizer');
const Parser = require('./Parser');

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
        
        const parser = new Parser(this.tokens);
        
        console.log(JSON.stringify(parser.parseTokens()));
    }
}

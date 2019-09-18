'use strict';

const Tokenizer = require('./Tokenizer');
const TreeBuilder = require('./TreeBuilder');

/**
 * Starting point of the language interpreter.
 * Catches the input and passes it to the tokenizer to
 * return the parsed output as json object.
 * @class Interpreter
 */
class Interpreter
{
    /**
     * @constructor
     * @param { string } input 
     */
    constructor(input)
    {
        this.input = input;
        this.tokens = [  ];
    }

    /**
     * Starts the Interpreter.
     * @method start
     */
    start()
    {
        const tokenizer = new Tokenizer(this.input);
        this.tokens = tokenizer.readInput();

        const treeBuilder = new TreeBuilder().createTree(this.tokens, 0);

        //return JSON.stringify(treeBuilder);
        return treeBuilder;
    };
}

module.exports = Interpreter;

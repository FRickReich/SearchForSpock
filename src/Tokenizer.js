'use strict';

/*
    The tokenizer takes the input string from the Interpreter and
    creates an array out of every character.
    It then creates sorts each input according to its type and
    content and creates json objects out of it.
*/

class Tokenizer
{
    constructor(input)
    {
        this.input = input;
        this.letterPosition = 0;
        this.letters = '';
        this.tokenId = 0;
        this.letterArray = [  ];
        this.tokenPositions = [  ];
        this.tokens = [  ];

        this.tokenTypes =
        {
            identifier: 'identifier',
            literal: 'literal',
            operator: 'operator',
            seperatorLeft: 'seperatorLeft',
            seperatorRight: 'seperatorRight',
            whitespace: 'whitespace'
        }
    }

    /* Reads input, splits it into array of characters. */
    readInput()
    {
        this.letterArray = this.input.split('');

        this.cycleThroughInput(this.letterPosition);

        return this.tokens;
    }

    /* Iterates throught character array, decides token type for each entry. */
    cycleThroughInput(pos)
    {
        // Add current character to letter-list.
        this.letters += this.letterArray[ pos ];
        this.tokenPositions.push(pos);
        
        switch(true)
        {
            // Current letters content equals 'and', 'or' or literal by letter:
            case /[a-zA-Z]/.test(this.letterArray[ pos ]):
                if(this.letters.indexOf('and') !== - 1 ||
                   this.letters.indexOf('or') !== - 1)
                {
                    this.createToken(this.tokenTypes.operator, this.letters);
                }
                else if(/\s/.test(this.letterArray[ pos + 1 ]) ||
                        /\)/.test(this.letterArray[ pos + 1 ]) ||
                        typeof this.letterArray[ pos + 1 ] == 'undefined')
                {
                    this.createToken(this.tokenTypes.literal, this.letters);
                }

                break;

            // Current letters content equals literal by number:
            case /[0-9]/.test(this.letterArray[ pos ]):
                if(/\s/.test(this.letterArray[ pos + 1 ]) ||
                   /\)/.test(this.letterArray[ pos + 1 ]) ||
                   typeof this.letterArray[ pos + 1 ] == 'undefined')
                {
                    this.createToken(this.tokenTypes.literal, this.letters);
                }

                break;

            // Current letters content equals ':':
            case /\:/.test(this.letterArray[ pos ]):
                const val = this.letters.replace(/\:/, '');

                this.createToken(this.tokenTypes.identifier, val);

                break;

            // Current letters content equals '(':
            case /\(/.test(this.letterArray[ pos ]):
                this.createToken(this.tokenTypes.seperatorLeft, '(');

                break;

            // Current letters content equals ')':
            case /\)/.test(this.letterArray[ pos ]):
                this.createToken(this.tokenTypes.seperatorRight, ')');

                break;

            // Current letters content is clean whitespace:
            case /\s/.test(this.letterArray[ pos ]):
                this.createToken(this.tokenTypes.whitespace);
                break;
        }

        // Repeat iteration until end of input array.
        if(this.letterPosition < this.letterArray.length -1)
        {
            this.letterPosition ++;

            this.cycleThroughInput(this.letterPosition);
        }
    }

    /* Creates token from input and pushes it to token array */
    createToken(type, value)
    {
        let pos = this.tokenPositions;

        if(type !== 'whitespace')
        {
            this.tokenId ++;

            this.tokens.push({
                'id': this.tokenId,
                'type': type,
                //'start': pos[ 0 ],
                //'end': pos[ pos.length - 1 ],
                'level': 0,
                'value': value
            });
        }

        this.tokenPositions = [  ];
        this.letters = '';
    }
}

module.exports = Tokenizer;

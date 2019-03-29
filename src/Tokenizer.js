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
        this.level = 0;

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
    readInput = () =>
    {
        this.letterArray = this.input.split('');

        this.cycleThroughInput(this.letterPosition);

        return this.tokens;
    };

    /* Iterates throught character array, decides token type for each entry. */
    cycleThroughInput = pos =>
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
                //this.createToken(this.tokenTypes.seperatorLeft, '(');
                this.skipToken
                break;

            // Current letters content equals ')':
            case /\)/.test(this.letterArray[ pos ]):
                //this.createToken(this.tokenTypes.seperatorRight, ')');
                this.skipToken()
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
    };

    skipToken = () =>
    {
        this.level = this.tokenId;
        this.tokenId ++;
    };

    /* Creates token from input and pushes it to token array */
    createToken = (type, value) =>
    {
        let parentId = 0;

        if(type !== 'whitespace')
        {
            if(type === 'identifier' || type === 'literal')
            {
                parentId = this.tokenId;
            } else if(type === 'operator')
            {
                parentId = this.tokenId - 2;
            } else if(type === 'seperatorLeft')
            {
                parentId = this.tokenId;
                this.level = this.tokenId;
            } else if(type === 'seperatorRight')
            {
                parentId = this.level;
            }

            this.tokenId ++;

            this.tokens.push({
                id: this.tokenId,
                type: type,
                value: value,
                parent: parentId
            });
        }

        this.tokenPositions = [  ];
        this.letters = '';
    };
}

module.exports = Tokenizer;

'use strict';

/*
    The parser takes the output from the tokenizer and 
    sorts every entry according to its type, content and position.
    Then it creates an AST array and sends it back to the interpreter.
*/
class Parser
{
    constructor(input, string)
    {
        this.tokens = input;
        this.activeToken = null;
        this.currentTokenId = 0;
        this.arm = { string , query: [  ]  };
        this.fullOutput = [  ];
    }

    parseTokens()
    {
        this.tokenTypeChecker();

        this.fullOutput.push(this.arm);

        return this.fullOutput;
    }

    /* Checks tokentype, adds the token to the ARM and cycles to next token if availible. */
    tokenTypeChecker()
    {
        let lastTokenId = this.currentTokenId;

        switch(this.tokens[ this.currentTokenId ].type)
        {
            // Type is 'identifier':
            case 'identifier':
                if(this.activeToken == null)
                {
                    this.arm.query.push(this.tokens[ this.currentTokenId ]);
                    this.activeToken = this.tokens[ this.currentTokenId ].id;
                    this.currentTokenId++;
                }
                else
                {
                    this.arm.query.forEach((element) =>
                    {
                        if(element.id === this.activeToken && element.type === 'operator')
                        {
                            element.child = this.tokens[ this.currentTokenId ];
                            this.activeToken = this.tokens[ this.currentTokenId ].id;
                            this.currentTokenId++;
                        }
                    });
                }

                break;

            // Type is 'literal':
            case 'literal':
                this.arm.query.forEach((element) =>
                {
                    if(element.id === this.activeToken && element.type === 'identifier')
                    {
                        element.child = this.tokens[ this.currentTokenId ];
                        this.activeToken = null;
                        this.currentTokenId++;
                    }
                    else if(element.child.id === this.activeToken && element.child.type === 'identifier')
                    {
                        element.child.child = this.tokens[ this.currentTokenId ];
                        this.activeToken = null;
                        this.currentTokenId++;
                    }
                });

                break;

            // Type is 'operator':
            case 'operator':
                if(this.activeToken == null)
                {
                    this.arm.query.push(this.tokens[ this.currentTokenId ]);
                    this.activeToken = this.tokens[ this.currentTokenId ].id;
                    this.currentTokenId++;
                }

                break;

            // Type is 'seperator' on left side:
            case 'seperatorLeft':
                this.activeToken = this.tokens[ this.currentTokenId ].id;
                this.currentTokenId++;

                break;

            // Type is 'seperator' on right side:
            case 'seperatorRight':
                this.activeToken = null;
                this.currentTokenId++;

                break;

            // Type is 'whitespace' (and can be ignored):
            case 'whitespace':
                this.currentTokenId++;

                break;
        }

        if(this.currentTokenId != lastTokenId && this.currentTokenId <= this.tokens.length -1)
        {
            this.tokenTypeChecker();
        }
    }
}

module.exports = Parser;

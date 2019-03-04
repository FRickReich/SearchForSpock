'use strict';

module.exports = class Parser
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

    tokenTypeChecker()
    {
        let lastTokenId = this.currentTokenId;

        switch(this.tokens[ this.currentTokenId ].type)
        {
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
            case 'operator':
                if(this.activeToken == null)
                {
                    this.arm.query.push(this.tokens[ this.currentTokenId ]);
                    this.activeToken = this.tokens[ this.currentTokenId ].id;
                    this.currentTokenId++;
                }
                break;
            case 'seperatorLeft':
                this.activeToken = this.tokens[ this.currentTokenId ].id;
                this.currentTokenId++;
                break;
            case 'seperatorRight':
                this.activeToken = null;
                this.currentTokenId++;
                break;
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

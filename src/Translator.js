'use strict';

/**
 * @class Translator
 */
class Translator
{
    /**
     * @constructor
     * @param { array } input 
     */
    constructor(input)
    {
        this.input = input;
        this.sentence = '';
        this.target = 'customer';
    }

    /**
     * @method findById
     * @param { array } item
     * @param { number } id
     * @returns { object }
     */
    findById(item, id)
    {
        let result;
        let p;

        if( item.id === id )
        {
            return item;
        }

        for (p in item)
        {
            if(item.hasOwnProperty(p) && typeof item[p] === 'object')
            {
                result = this.findById(item[p], id);

                if(result)
                {
                    return result;
                }
            }
        }

        return result;
    }

    /**
     * @method cycleTokens
     * @return { function }
     */
    cycleTokens()
    {
        for(let i = 1; i < 10000; i++)
        {
            if(this.findById(this.input, i))
            {
                const node = this.findById(this.input, i);

                switch(node.type)
                {
                    case 'identifier':
                        // e.G.: id, userId, customerId, supplierId, createdOn.

                        break;

                    case 'literal':
                        // e.G.: 12345, captain-kirk@enterprise.com, Date

                        if(/^\d+$/.test(node.value))
                        {
                            // literal numeric.
                        }
                        else
                        {
                            // literal string.
                        }

                        break;

                    case 'operator':

                        if(node.value === 'and')
                        {
                            // AND operator.
                        }
                        else if(node.value === 'or')
                        {
                            // OR operator.
                        }

                        break;
                    default:
                        this.cycleTokens();
                        break;
                }
            }
        }

        return this.createOutput();
    }

    /**
     * @method createOutput
     * @returns { string }
     */
    createOutput()
    {
        return "test";
    }
}

module.exports = Translator;

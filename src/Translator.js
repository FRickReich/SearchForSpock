'use strict';

class Translator
{
    constructor(input)
    {
        this.input = input;
        this.sentence = '';
        this.target = 'customer';
    }

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

    findByIdReturnProperty(item, prop, val, returnprop)
    {
        let result;
        let p;

        if(item == null)
        {
            return false;
        }

        if(item[prop] === val)
        {
            return (returnprop) ? item[returnprop] : item;
        }

        for (p in item)
        {
            if( item.hasOwnProperty(p) && typeof item[p] === 'object' )
            {
                result = this.findByIdReturnProperty(item[p], prop, val);

                if(result)
                {
                    return (returnprop) ? result[returnprop] : result;
                }
            }
        }

        return (returnprop) ? result[returnprop] : result;
    }

    /*
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
                        this.sentence += node.value;
                        break;
                    case 'literal':
                        if(/^\d+$/.test(node.value))
                        {
                            this.sentence += ` = ${node.value}`
                        }
                        else
                        {
                            this.sentence += ` = '${node.value}'`
                        }
                        break;
                    case 'operator':
                        if(node.value === 'and')
                        {
                            this.sentence += ' AND '
                        }
                        else if(node.value === 'or')
                        {
                            this.sentence += ')\nOR\n('
                        }
                        break;
                }
            }
        }

        return this.createOutput();
    }

    createOutput()
    {
        return `SELECT *\nFROM ${this.target}\nWHERE\n(${this.sentence});`;
    }
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

    createOutput()
    {
        return "test";
    }
}

module.exports = Translator;

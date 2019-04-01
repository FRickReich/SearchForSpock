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

    cycleIds()
    {
        for(let i = 1; i < 10000; i++)
        {
            if(this.findById(this.input, i))
            {
                const type = this.findByIdReturnProperty(this.input, 'id', i, 'type');
                const value = this.findByIdReturnProperty(this.input, 'id', i, 'value');

                switch(type)
                {
                    case 'identifier':
                        this.sentence += value
                        break;
                    case 'literal':
                        if(/^\d+$/.test(value))
                        {
                            this.sentence += ` = ${value}`
                        }
                        else
                        {
                            this.sentence += ` = '${value}'`
                        }
                        break;
                    case 'operator':
                        if(value === 'and')
                        {
                            this.sentence += ' AND '
                        }
                        else if(value === 'or')
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
}

module.exports = Translator;

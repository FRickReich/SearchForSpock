'use strict';

class Translator
{
    constructor(input)
    {
        this.input = input;
        this.sentence = '';
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
        for(let i = 1; i < 100; i++)
        {
            if(this.findById(this.input, i))
            {
                const type = this.findByIdReturnProperty(this.input, "id", i, "type");
                const value = this.findByIdReturnProperty(this.input, "id", i, "value");

                if(type == "identifier")
                {
                    this.sentence += value
                }
                if(type == "literal")
                {
                    this.sentence += ` = "${value}"`
                }
                if(type == "operator" && value == "and")
                {
                    this.sentence += "\nAND\n"
                }
                if(type == "operator" && value == "or")
                {
                    this.sentence += "\nOR\n"
                }

            }
        }

        console.log(this.createOutput());
    }

    createOutput()
    {
        const output = `SELECT *\nFROM\n${this.sentence};`;

        return output;
    }
}

module.exports = Translator;

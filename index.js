'use strict';

const Interpreter = require('./src/Interpreter');

// AST:
// identifier: type, startposition, endposition, value, body
// operator: type, start, end, left, right, value
// literal: type, start, end, value
// seperator -> creates a block: type, start, end, value
// string -> does not delete whitespace inside of "...", type, start, end, value

/*
const testString = `
    captainId: james.kirk@starfleet.com
    and
    (
    captainId: kaaaaaaaaaaaaahn@botany-bay.com
    or
    captainId: just@sisko.com
    )
`;
*/

const testString = `a: james.kirk@starfleet.com and b: just@sisko.com`;

const interpreter = new Interpreter(testString).start();
console.log(interpreter);

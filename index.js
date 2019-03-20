'use strict';

const Interpreter = require('./src/Interpreter');

// AST:
// identifier: type, startposition, endposition, value, body
// operator: type, start, end, left, right, value
// literal: type, start, end, value
// seperator -> creates a block: type, start, end, value
// string -> does not delete whitespace inside of "...": type, start, end, value

// const testString = `a: james.kirk@starfleet.com and b: just@sisko.com`;

const testString = `
    captainId: james.kirk@starfleet.com
    and
    (
        captainId: kaaaaaaaaaaaaahn@botany-bay.com
        or
        (
            captainId: just@sisko.com
            and
            (
                captainId: earlGrayHot@chateau-picard.com
                or
                captainId: janeway@coffee-chaos.com
            )
        )
    )
`;

/* 
    PREDICTION:
    ┳
    ┃
    ┣━━━┳━━━ type: identifier
    ┃   ┣━━━ value: captainId
    ┃   ┗━━━┳━━━ type: literal
    ┃       ┗━━━ value: james.kirk@starfleet.com
    ┗━━━┳━━━ type: operator
        ┣━━━ value: and
        ┣━━━┳━━━ type: identifier 
        ┃   ┣━━━ value: captainId
        ┃   ┗━━━┳━━━ type: literal
        ┃       ┗━━━ value: kaaaaaaaahn@botany-bay.com
        ┗━━━┳━━━ type: operator
            ┣━━━ value: or
            ┣━━━┳━━━ type: identifier
            ┃   ┣━━━ value: captainId
            ┃   ┗━━━┳━━━ type: literal
            ┃       ┗━━━ value: just@sisko.com
            ┗━━━┳━━━ type: operator
                ┣━━━ value: and
                ┣━━━┳━━━ type: identifier
                ┃   ┣━━━ value: captainId
                ┃   ┗━━━┳━━━ type: literal
                ┃       ┗━━━ value: earlGrayHot@chateau-picard.com
                ┗━━━┳━━━ type: operator
                    ┣━━━ value: or
                    ┗━━━┳━━━ type: identifier
                        ┣━━━ value: captainId
                        ┗━━━┳━━━ type: literal
                            ┗━━━ value: janeway@coffee-chaos.com
*/

const interpreter = new Interpreter(testString).start();
console.log(interpreter);

# SearchForSpock

a simple search query language for the BNP-CRUD-UI.

// AST:
// identifier: type, startposition, endposition, value, body
// operator: type, start, end, left, right, value
// literal: type, start, end, value
// seperator -> creates a block: type, start, end, value
// string -> does not delete whitespace inside of "...": type, start, end, value

// const testString = `a: james.kirk@starfleet.com and b: just@sisko.com`;

/*
const testString = `
    captainId: james.kirk@starfleet.com
    and
    (
        enemyId: kaaaaaaaaaaaaahn@botany-bay.com
        or
        (
            captainId: just@sisko.com
            and
            (
                enemyId: earlGrayHot@chateau-picard.com
                or
                captainId: janeway@coffee-chaos.com
            )
        )
    )
`;
*/

/*
    AST PREDICTION:
    ┳
    ┣━━━┳━━━ type: identifier
    ┃   ┣━━━ value: captainId
    ┃   ┗━━━┳━━━ type: literal
    ┃       ┗━━━ value: james.kirk@starfleet.com
    ┗━━━┳━━━ type: operator
        ┣━━━ value: and
        ┣━━━┳━━━ type: identifier
        ┃   ┣━━━ value: enemyId
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
                ┃   ┣━━━ value: enemyId
                ┃   ┗━━━┳━━━ type: literal
                ┃       ┗━━━ value: earlGrayHot@chateau-picard.com
                ┗━━━┳━━━ type: operator
                    ┣━━━ value: or
                    ┗━━━┳━━━ type: identifier
                        ┣━━━ value: captainId
                        ┗━━━┳━━━ type: literal
                            ┗━━━ value: janeway@coffee-chaos.com

    OUTPUT PREDICTION:
    SELECT *
    FROM captainsList
    WHERE
    captainId = "james.kirk@starfleet.com"
    AND
    enemyId = kaaaaaaaahn@botany-bay.com
    OR
    captainId = "just@sisko.com"
    AND
    enemyId = earlGreyHot@chateau-picard.com
    OR
    captainId = "janeway@coffee-chaos.com"

*/

/*
    AST PREDICTION:
    ┳
    ┣━━━┳━━━ type: identifier
    ┃   ┣━━━ value: captainId
    ┃   ┗━━━┳━━━ type: literal
    ┃       ┗━━━ value: robby.april@starfleet.com
    ┗━━━┳━━━ type: operator
        ┣━━━ value: and
        ┣━━━┳━━━ type: identifier
        ┃   ┣━━━ value: starshipId
        ┃   ┗━━━┳━━━ type: literal
        ┃       ┗━━━ value: 1701
        ┗━━━┳━━━ type: operator
            ┣━━━ value: or
            ┗━━━┳━━━ type: identifier
                ┣━━━ value: planetID
                ┗━━━┳━━━ type: literal
                    ┗━━━ value: TalosIV
 */
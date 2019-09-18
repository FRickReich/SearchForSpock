# SearchForSpock

a simple search query language.

## AST

**identifiers:**
- type
- startposition
- endposition
- value
- body

**operator:**
- type
- start
- end
- left
- right
- value

**literal:**
- type
- start
- end
- value
  
**seperator:** *(-> creates a block)*
- type
- start
- end
- value

**string:** *(-> does not delete whitespace of "...")*
- type
- start
- end
- value

## EXAMPLE

### INPUT STRING

```bash
captainId: pikedypikepike@starfleet.com and ( starshipId: 1701 or planetID: TalosIV )
```

### AST OUPUT PREDICTION:

```bash
┳
┣━━━┳━━━ type: identifier
┃   ┣━━━ value: captainId
┃   ┗━━━┳━━━ type: literal
┃       ┗━━━ value: pikedypikepike@starfleet.com
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
```

### JSON OUTPUT:

```json
[
    {
        "id": 1,
        "type": "identifier",
        "value": "captainId",
        "parent": 0,
        "children":
        [
            {
                "id": 2,
                "type": "literal",
                "value": "pikedypikepike@starfleet.com",
                "parent": 1,
                "children": [  ]
            }
        ]
    },
    {
        "id": 3,
        "type": "operator",
        "value": "and",
        "parent": 0,
        "children":
        [
            {
                "id": 4,
                "type": "identifier",
                "value": "starshipId",
                "parent": 3,
                "children":
                [
                    {
                        "id": 5,
                        "type": "literal",
                        "value": "1701",
                        "parent": 4,
                        "children": [  ]
                    }
                ]
            },
            {
                "id": 6,
                "type": "operator",
                "value": "or",
                "parent": 3,
                "children":
                [
                    {
                        "id": 7,
                        "type": "identifier",
                        "value": "planetID",
                        "parent": 6,
                        "children":
                        [
                            {
                                "id": 8,
                                "type": "literal",
                                "value": "TalosIV",
                                "parent": 7,
                                "children": [  ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
```

### SQL OUTPUT

```sql
SELECT *
FROM captainsList
Where
captainId = "pikedypikepike@starfleet.com"
AND
startshipId = "1701"
OR
planetId = "TalosIV"
```

## ADVANCED EXAMPLE

### INPUT STRING

```bash
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
```

### AST OUPUT PREDICTION:

```bash
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
```

### JSON OUTPUT:

```json
[
    {
        "id": 1,
        "type": "identifier",
        "value": "captainId",
        "parent": 0,
        "children":
        [
            {
                "id": 2,
                "type": "literal",
                "value": "james.kirk@starfleet.com",
                "parent": 1,
                "children": [  ]
            }
        ]
    },
    {
        "id": 3,
        "type": "operator",
        "value": "and",
        "parent": 0,
        "children":
        [
            {
                "id": 4,
                "type": "identifier",
                "value": "enemyId",
                "parent": 3,
                "children":
                [
                    {
                        "id": 5,
                        "type": "literal",
                        "value": "kaaaaaaaaaaaaahn@botany-bay.com",
                        "parent": 4,
                        "children": [  ]
                    }
                ]
            },
            {
                "id": 6,
                "type": "operator",
                "value": "or",
                "parent": 3,
                "children":
                [
                    {
                        "id": 7,
                        "type": "identifier",
                        "value": "captainId",
                        "parent": 6,
                        "children":
                        [
                            {
                                "id": 8,
                                "type": "literal",
                                "value": "just@sisko.com",
                                "parent": 7,
                                "children": [  ]
                            }
                        ]
                    },
                    {
                        "id": 9,
                        "type": "operator",
                        "value": "and",
                        "parent": 6,
                        "children":
                        [
                            {
                                "id": 10,
                                "type": "identifier",
                                "value": "enemyId",
                                "parent": 9,
                                "children":
                                [
                                    {
                                        "id": 11,
                                        "type": "literal",
                                        "value": "earlGrayHot@chateau-picard.com",
                                        "parent": 10,
                                        "children": [  ]
                                    }
                                ]
                            },
                            {
                                "id": 12,
                                "type": "operator",
                                "value": "or",
                                "parent": 9,
                                "children":
                                [
                                    {
                                        "id": 13,
                                        "type": "identifier",
                                        "value": "captainId",
                                        "parent": 12,
                                        "children":
                                        [
                                            {
                                                "id": 14,
                                                "type": "literal",
                                                "value": "janeway@coffee-chaos.com",
                                                "parent": 13,
                                                "children": [  ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
```

### SQL OUTPUT

```sql
SELECT *
FROM captainsList
WHERE
captainId = "james.kirk@starfleet.com"
AND
enemyId = "kaaaaaaaahn@botany-bay.com"
OR
captainId = "just@sisko.com"
AND
enemyId = "earlGreyHot@chateau-picard.com"
OR
captainId = "janeway@coffee-chaos.com"
```

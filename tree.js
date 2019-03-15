'use strict';

/*
    identifier:     captainId
    literal:        james.kirk@starfleet.com
    operator:       and
    seperatorLeft:  (
    identifier:     captainId
    literal:        kaaaaaaaaaaaaahn@botany-bay.com
    operator:       or
    identifier:     captainId
    literal:        just@sisko.com
    seperatorRight: )
*/

const createTree = (nodes, id) =>
{
    const groupedByParent = groupByKey(nodes, "parent");

    return processNode(groupedByParent, id);
}

const groupByKey = (arr, key) =>
{
    return arr.reduce((acc, cur) =>
    {
        return {
            ...acc, 
            [ cur [ key ] ]: [
                ...(acc[ cur [ key ] ] || [  ]), 
                cur
            ]
        };
    }, {  });
}

const processNode = (groupNodes, parent) =>
{
    const nodesForParent = groupNodes[ parent ];
    
    return nodesForParent ? nodesForParent.map(n => ({ 
        nodes: n, 
        children: processNode(groupNodes, n.id) 
    })) : [  ];
}

const nodes =
[
    {
        id: 1,
        type: 'identifier',
        value: 'a',
        parent: 0
    },
    {
        id: 2,
        type: 'literal',
        value: 'james.kirk@starfleet.com',
        parent: 1
    },
    {
        id: 3,
        type: 'operator',
        value: 'and',
        parent: 0
    },
    {
        id: 4,
        type: 'seperatorLeft',
        value: '(',
        parent: 3
    },
    {
        id: 5,
        type: 'identifier',
        value: 'b',
        parent: 4
    },
    {
        id: 6,
        type: 'literal',
        value: 'kaaaaaaaaaaaaahn@botany-bay.com',
        parent: 5
    },
    {
        id: 7,
        type: 'operator',
        value: 'or',
        parent: 4
    },
    {
        id: 8,
        type: 'identifier',
        value: 'c',
        parent: 7
    },
    {
        id: 9,
        type: 'literal',
        value: 'just@sisko.com',
        parent: 8
    },
    {
        id: 10,
        type: 'seperatorRight',
        value: ')',
        parent: 3
    },
];

console.log(JSON.stringify(createTree(nodes, 0), null, 4));

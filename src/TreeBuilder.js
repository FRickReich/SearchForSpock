'use strict';

class TreeBuilder
{
    createTree(input, id)
    {
        const groupedByParent = this.groupByKey(input, "parent");

        return this.processNode(groupedByParent, id);
    }

    groupByKey(arr, key)
    {
        return arr.reduce((content, position) =>
        {
            return {
                ...content, [ position[ key ] ]
                :
                [ ...(content[ position[ key ] ] || [  ]),
                    position
                ]
            };
        },
        {  });
    }

    processNode(groupNodes, parent)
    {
        const nodesForParent = groupNodes[ parent ];

        return nodesForParent ? nodesForParent.map(n => ({
            node: {
                id: n.id,
                type: n.type,
                value: n.value,
                parent: n.parent,
                children: this.processNode(groupNodes, n.id)
            }
        }))
        :
        [  ];
    }
}

module.exports = TreeBuilder;

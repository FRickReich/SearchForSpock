'use strict';

/**
 * @class TreeBuilder
 */
class TreeBuilder
{
    /**
     * @method createTree
     * @param { array } input
     * @param { number } id
     * @returns { function }
     */
    createTree(input, id)
    {
        const groupedByParent = this.groupByKey(input, "parent");
        
        return this.processNode(groupedByParent, id);
    };

    /**
     * @method groupByKey
     * @param { array } arr 
     * @param { string } key 
     * @returns { object }
     */
    groupByKey(arr, key)
    {
        return arr.reduce((content, position) => {
            return {
                ...content, [position[key]]: [...(content[position[key]] || []),
                    position
                ]
            };
        }, {});
    };

    /**
     * @method processNode
     * @param { object } groupNodes 
     * @param { number } parent 
     * @returns { object }
     */
    processNode(groupNodes, parent)
    {
        const nodesForParent = groupNodes[ parent ];

        return nodesForParent ? nodesForParent.map(n => ({
            id: n.id,
            type: n.type,
            value: n.value,
            parent: n.parent,
            children: this.processNode(groupNodes, n.id)
        }))
        :
        [  ];
    };
}

module.exports = TreeBuilder;

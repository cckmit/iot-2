/**
 * 一维数组转化成树状结构
 * @param {any} data
 * @param {any} rootId
 * @param {any} idField
 * @param {any} pidField
 * @param {any} childrenField
 */
export function getTreeByArr(data, rootId, idField = 'Id', pidField = 'ParentId', childrenField ="children") {
    // 递归方法
    function getChildren(id) {
        var node = []
        for (var i = 0; i < data.length; i++) {
            if (data[i][pidField] == id) {
                data[i][childrenField] = getChildren(data[i][idField])
                node.push(data[i])
            }
        }
        if (node.length == 0) {
            return
        } else {
            return node
        }
    }

    // 使用根节点
    if (rootId) {
        return getChildren(rootId);
    }

    // 无根节点
    else {
        //1: 找到根节点
        let set = new Set();
        for (let i in data) {
            set.add(data[i][pidField])
        }

        const all_pids = Array.from(set);

        const all_ids = data.map(i => i[idField]);

        const upids = all_pids.filter(i => {
            return all_ids.indexOf(i) < 0;
        });

        data = data.map(i => {
            if (upids.indexOf(i[pidField]) < 0) {
                return i;
            } else {
                return {
                    ...i,
                    ...{
                        [pidField]: '00000'
                    }
                }
            }
        });

        return getChildren('00000');
    }
}

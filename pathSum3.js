// 437. 路径总和 III
// 给定一个二叉树，它的每个结点都存放着一个整数值。

// 找出路径和等于给定数值的路径总数。

// 路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

// 二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。

// 示例：

// root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

//       10
//      /  \
//     5   -3
//    / \    \
//   3   2   11
//  / \   \
// 3  -2   1

// 返回 3。和等于 8 的路径有:

// 1.  5 -> 3
// 2.  5 -> 2 -> 1
// 3.  -3 -> 11

// 双重 dfs
var pathSum = function (root, sum) {
  if (root === null) {
    return 0
  }

  return dfs(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum)
}

// 当前起点下的所有路径
var dfs = function (root, sum) {
  if (root === null) {
    return 0
  }

  sum -= root.val
  var count = sum === 0 ? 1 : 0
  return count + dfs(root.left, sum) + dfs(root.right, sum)
}

// 单递归  + 前缀和
var pathSum = function (root, sum) {
  var count = 0
  var map = new Map()
  map.set(0, 1)

  var dfs = function (root, preSum) {
    if (root === null) {
      return
    }

    preSum += root.val

    if (map.has(preSum - sum)) {
      count += map.get(preSum - sum)
    }

    if (map.has(preSum)) {
      map.set(preSum, map.get(preSum) + 1)
    } else {
      map.set(preSum, 1)
    }

    dfs(root.left, preSum)
    dfs(root.right, preSum)
    // 回溯时，重置当前前缀和在 map 中的值
    map.set(preSum, map.get(preSum) - 1)
  }

  dfs(root, 0)

  return count
}

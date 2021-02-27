// 113. 路径总和 II
// 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:
// 给定如下二叉树，以及目标和 sum = 22，

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// 返回:

// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]

function pathSum(root, targetSum) {
  if (root === null) {
    return []
  }

  var res = []
  // 存放节点
  var nodeQueue = [root]
  // 存放路径和
  var sumQueue = [0]
  // 存放路径数组
  var pathQueue = [[]]

  while (nodeQueue.length) {
    var node = nodeQueue.shift()
    var sum = sumQueue.shift()
    var path = [...pathQueue.shift()]
    sum += node.val
    path.push(node.val)

    if (node.left === null && node.right === null && sum === targetSum) {
      res.push(path)
      continue
    }

    if (node.left) {
      nodeQueue.push(node.left)
      sumQueue.push(sum)
      pathQueue.push(path)
    }

    if (node.right) {
      nodeQueue.push(node.right)
      sumQueue.push(sum)
      pathQueue.push(path)
    }
  }

  return res
}

// 递归实现
function pathSum(root, targetSum) {
  var res = []
  // 记录路径
  var path = []
  var dfs = function (root, sum) {
    if (root === null) {
      return
    }
    sum += root.val
    // 添加到队列
    path.push(root.val)
    if (root.left === null && root.right === null && sum === targetSum) {
      res.push([...path])
    }
    dfs(root.left, sum)
    dfs(root.right, sum)
    // 执行结束，将最后一个移除
    path.pop()
  }
  dfs(root, 0)
  return res
}

function dfs(root) {
  var queue = [root]
  while (queue.length) {
    var node = queue.pop()

    if (node.right) {
      queue.push(node.right)
    }
    if (node.left) {
      queue.push(node.left)
    }
  }
}

// 114. 二叉树展开为链表
// 给你二叉树的根结点 root ，请你将它展开为一个单链表：

// 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
// 展开后的单链表应该与二叉树 先序遍历 顺序相同。

// 示例 1：

// 输入：root = [1,2,5,3,4,null,6]
// 输出：[1,null,2,null,3,null,4,null,5,null,6]
// 示例 2：

// 输入：root = []
// 输出：[]
// 示例 3：

// 输入：root = [0]
// 输出：[0]

// 原地算法 O(1) 空间复杂度

var flatten = function (root) {
  if (root === null) {
    return null
  }

  var cur = null
  var queue = [root]

  while (queue.length) {
    var node = queue.pop()

    if (cur === null) {
      cur = node
    } else {
      cur.left = null
      cur.right = node
      cur = node
    }

    if (node.right !== null) {
      queue.push(node.right)
    }
    if (node.left !== null) {
      queue.push(node.left)
    }
  }
  return root
}

var flatten = function (root) {
  var list = []
  dfs(root, list)
  var prev = root
  for (let i = 1; i < list.length; i++) {
    var node = list[i]
    prev.left = null
    prev.right = node
    prev = node
  }
  return root
}

// 先序遍历
var dfs = function (root, list) {
  if (root === null) {
    return
  }
  list.push(root)
  dfs(root.left, list)
  dfs(root.right, list)
}

// O(1) 空间复杂度
var flatten = function (root) {}

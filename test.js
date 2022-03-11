function arrayToTree(list) {
  const result = []
  getChildren(list, result, list[0].pid)
  return result
}

function getChildren(list, result, pid) {
  for (let item of list) {
    if (pid === item.pid) {
      const target = { ...item, children: [] }
      result.push(target)
      getChildren(list, target.children, item.id)
    }
  }
}

let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 6, name: '部门11', pid: 0 },
  { id: 5, name: '部门5', pid: 4 },
]

arrayToTree(arr)

function arrayToTree(list) {
  const result = []
  const map = new Map()

  for (const item of list) {
    map.set(item.id, { ...item, children: [] })
  }

  for (const item of list) {
    const mapItem = map.get(item.id)
    if (!map.get(item.pid)) {
      result.push(mapItem)
    } else {
      map.get(item.pid).children.push(mapItem)
    }
  }

  return result
}

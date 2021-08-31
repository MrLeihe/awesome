var uid = 0

class Dep {
  constructor() {
    this.id = ++uid
    this.subs = []
  }

  depend() {
    if (this.target) {
      this.target.addDep(this)
    }
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    var subs = this.subs
    for (let i = 0, l = subs.length; i < l.length; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
var targetStack = []

function pushTarget(watcher) {
  // 多次调用时，先将 watcher 暂存到栈中，之后再按推入顺序出栈（render watcher 始终在最下面）
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = watcher
}

function popTarget() {
  Dep.target = targetStack.pop()
}

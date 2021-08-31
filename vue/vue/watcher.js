class Watcher {
  constructor(vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm
    this.deps = []
    this.depIds = new Set()
    // 简单处理 getter
    this.getter = expOrFn
    this.cb = cb
    this.options = options
    // value 在 computedWatcher 时用于缓存值
    this.value = null
    if (options) {
      this.lazy = !!options.lazy
      this.dirty = !!options.lazy
      this.sync = !!options.sync
    }
  }

  addDep(dep) {
    if (!this.depIds.has(dep.id)) {
      this.deps.push(dep)
      this.depIds.add(dep.id)
      dep.addSub(this)
    }
  }

  get() {
    pushTarget(this)
    try {
      this.value = this.getter.call(vm)
    } catch (e) {
      error(e)
    } finally {
      popTarget()
    }
  }

  update() {
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      // queueWatcher()
      // 暂时先弄成同步渲染
      this.run()
    }
  }

  run() {
    this.get()
  }
}

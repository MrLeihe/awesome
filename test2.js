function useState(initialState) {
  let state = initialState
  const setState = (newState) => {
    state = newState
    render()
  }
  return [state, setState]
}

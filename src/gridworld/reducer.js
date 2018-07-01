import Grid from './grid'


const reducers = {
  CREATE_GRID: (state, action) => {
    const grid = buildGrid(state)
    return {
      ...state,
      grid: grid,
      nodes: grid.sortedNodes()
    }
  },
  ITERATE_POLICY_VALUE: (state, action) => {
    state.grid.iteratePolicyValue()
    return {
      ...state,
      nodes: state.grid.sortedNodes()
    }
  },
  ITERATE_OPTIMAL_VALUE:  (state, action) => {
    state.grid.iterateOptimalValue()
    return {
      ...state,
      nodes: state.grid.sortedNodes()
    }
  },
  CHANGE_NUM_ROWS: (state, action) => {
    let newRows = state.rows + action.increment
    newRows = newRows < 2 ? 2 : newRows
    const newState = { ...state, rows: newRows }
    newState.grid = buildGrid(newState)
    newState.nodes = newState.grid.sortedNodes()
    return newState
  },
  CHANGE_NUM_COLS: (state, action) => {
    let newCols = state.cols + action.increment
    newCols = newCols < 2 ? 2 : newCols
    const newState = { ...state, cols: newCols }
    newState.grid = buildGrid(newState)
    newState.nodes = newState.grid.sortedNodes()
    return newState
  },
  TOGGLE_TERMINAL: (state, action) => {
    let terminals = state.terminals
    const isTerminalNow = terminals.some(t => t[0] === action.row && t[1] === action.col)
    if (!isTerminalNow) {
      terminals.push([action.row, action.col])
    } else {
      terminals = terminals.filter(t => !(t[0] === action.row && t[1] === action.col))
    }
    const newState = { ...state, terminals }
    const grid = buildGrid(newState)
    return {
      ...newState,
      grid: grid,
      nodes: grid.sortedNodes()
    }
  },
}

const buildGrid = state => {
   const grid = new Grid(state.rows, state.cols, state.terminals)
   window.GRIDWORLD = { grid: grid }
  return grid
}

module.exports =  (state, action) => {
  const func = reducers[action.type]
  if (!func) return {...state}
  return {
    ...state,
    grid: func(state.grid, action)
  }
}

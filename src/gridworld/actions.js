const actions = {
  createGrid: () => ({type: 'CREATE_GRID'}),
  iteratePolicyValue: () => ({type: 'ITERATE_POLICY_VALUE'}),
  iterateOptimalValue: () => ({type: 'ITERATE_OPTIMAL_VALUE'}),
  changeNumRows: inc => ({type: 'CHANGE_NUM_ROWS', increment: inc}),
  changeNumCols: inc => ({type: 'CHANGE_NUM_COLS', increment: inc}),
  toggleTerminal: (row, col) => ({type: 'TOGGLE_TERMINAL', row: row, col: col}),
}

module.exports = actions

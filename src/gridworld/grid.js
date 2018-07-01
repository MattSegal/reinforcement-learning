export const ACTIONS = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST',
}

const REWARD = -1 // -1 reward per timestep
const DISCOUNT = 1 // undiscounted


export default class Grid {

  constructor(rows, cols, terminals) {
    this.rows = rows
    this.cols = cols
    this.nodes = []

    // Create nodes
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.nodes.push({
          isTerminal: terminals.some(t => t[0] === i & t[1] === j),
          row: i,
          col: j,
          value: 0,
        })
      }
    }

    // Add actions to nodes, creating in-place object references
    for (let node of this.nodes) {
      this.buildActions(node)
    }
  }

  buildActions = node => {
    const actions = []
    const noNorth = node.isTerminal || node.row === 0
    const noSouth = node.isTerminal || node.row === this.rows - 1
    const noEast = node.isTerminal || node.col === this.cols - 1
    const noWest = node.isTerminal || node.col === 0
    if (noNorth) actions.push({type: ACTIONS.NORTH, next: node})
    if (noSouth) actions.push({type: ACTIONS.SOUTH, next: node})
    if (noEast ) actions.push({type: ACTIONS.EAST, next: node})
    if (noWest) actions.push({type: ACTIONS.WEST, next: node})

    for (let n of this.nodes) {
      const isNorth = !noNorth && n.col === node.col && n.row === node.row - 1
      const isSouth = !noSouth && n.col === node.col && n.row === node.row + 1
      const isEast = !noEast && n.row === node.row && n.col === node.col + 1
      const isWest = !noWest && n.row === node.row && n.col === node.col - 1
      if (isNorth) actions.push({type: ACTIONS.NORTH, next: n})
      if (isSouth) actions.push({type: ACTIONS.SOUTH, next: n})
      if (isEast ) actions.push({type: ACTIONS.EAST, next: n})
      if (isWest) actions.push({type: ACTIONS.WEST, next: n})
    }
    node.actions = actions
  }

  policy = node => ({
    [ACTIONS.NORTH]: 0.25,
    [ACTIONS.SOUTH]: 0.25,
    [ACTIONS.EAST]: 0.25,
    [ACTIONS.WEST]: 0.25,
  })

  sortedNodes = () => this.nodes
  .map(n => ({...n, bestAction: this.getBestAction(n)}))
  .sort((a, b) =>
    a.row === b.row
    ? a.col < b.col ? -1 : 1
    : a.row < b.row ? -1 : 1
  )

  getBestAction = node => (
    node.isTerminal
      ? null
      : node.actions.reduce((best, action) =>
        best.next.value < action.next.value ? action : best,
          node.actions[0]
      ).type
  )

  iteratePolicyValue = () => {
    for (let node of this.nodes) {
      let value = 0
      // Sum value over all possible actions
      for (const action of node.actions) {
        // Get the policy's probability of taking this action
        const policyProbability = this.policy(node)[action.type]
        // Get the reward for having been in this state
        const reward = node.isTerminal ? 0 : REWARD
        // Get the value of the next state
        const futureValue = action.next.value
        value += policyProbability * (reward + futureValue)
      }
      node.value = value
    }
  }
}

import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../actions'
import { ACTIONS } from '../grid'

import styles from './grid.css'


const ACTION_STYLES = {
  [ACTIONS.NORTH]: styles.north,
  [ACTIONS.SOUTH]: styles.south,
  [ACTIONS.EAST]: styles.east,
  [ACTIONS.WEST]: styles.west,
}


const mapStateToProps = state => ({
  rows: state.grid.rows,
  cols: state.grid.cols,
  nodes: state.grid.nodes,
})
const mapDispatchToProps = dispatch => ({
  createGrid: () => dispatch(actions.createGrid()),
  toggleTerminal: (row, col) => dispatch(actions.toggleTerminal(row, col)),
})

class Grid extends Component {

  componentDidMount() {
    this.props.createGrid()
  }

  getGridStyle = () => ({
    gridTemplateColumns: `repeat(${this.props.cols}, 80px)`,
    gridTemplateRows: `repeat(${this.props.rows}, 80px)`,
  })

  getNodeClass = n => {
    const grey = ((n.row + n.col) % 2 === 0) ? styles.grey : styles.white
    const terminal = n.isTerminal && styles.terminal
    const direction = ACTION_STYLES[n.bestAction]
    return `${styles.node} ${grey} ${terminal} ${direction}`
  }

  render() {
    return (
      <div className={styles.grid} style={this.getGridStyle()}>
        {this.props.nodes.map(n => (
          <div
            key={`${n.row}-${n.col}`}
            className={this.getNodeClass(n)}
            onClick={() => this.props.toggleTerminal(n.row, n.col)}
          >
            <div className={styles.index}>{n.row}-{n.col}</div>
            <div className={styles.value}>{n.value.toFixed(0)}</div>
          </div>
        ))}
      </div>
    )
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Grid)

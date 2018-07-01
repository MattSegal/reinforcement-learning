import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../actions'

import styles from './controls.css'


const mapStateToProps = state => ({
  rows: state.grid.rows,
  cols: state.grid.cols,
})
const mapDispatchToProps = dispatch => ({
  iteratePolicyValue: () => dispatch(actions.iteratePolicyValue()),
  iterateOptimalValue: () => dispatch(actions.iterateOptimalValue()),
  changeNumRows: inc => () => dispatch(actions.changeNumRows(inc)),
  changeNumCols: inc => () => dispatch(actions.changeNumCols(inc)),
  createGrid: () => dispatch(actions.createGrid()),
})

class Controls extends Component {

  componentDidMount() {
    setInterval(this.props.iterateOptimalValue, 100)
  }

  render() {
    return <div className={styles.controls}>
      <Counter
        text={`${this.props.rows} rows`}
        increase={this.props.changeNumRows(1)}
        decrease={this.props.changeNumRows(-1)}
      />
      <Counter
        text={`${this.props.cols} cols`}
        increase={this.props.changeNumCols(1)}
        decrease={this.props.changeNumCols(-1)}
      />
      <button className={styles.button} onClick={this.props.createGrid}>reset</button>
    </div>
  }
}


const Counter = props => (
  <div className={styles.counter}>
    <button onClick={props.increase}>+</button>
    <div className={styles.text}>{props.text}</div>
    <button onClick={props.decrease}>-</button>
  </div>
)


module.exports = connect(mapStateToProps, mapDispatchToProps)(Controls)

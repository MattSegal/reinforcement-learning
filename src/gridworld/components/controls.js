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
  changeNumRows: inc => () => dispatch(actions.changeNumRows(inc)),
  changeNumCols: inc => () => dispatch(actions.changeNumCols(inc)),
  createGrid: () => dispatch(actions.createGrid()),
})

class Controls extends Component {

  componentDidMount() {
    setInterval(this.props.iteratePolicyValue, 300)
  }

  render() {
    return <div style={{fontSize: '3rem'}}>
      <div>
        <button onClick={this.props.changeNumRows(1)}>+</button>
        {this.props.rows} rows
        <button onClick={this.props.changeNumRows(-1)}>-</button></div>
      <div>
        <button onClick={this.props.changeNumCols(1)}>+</button>
        {this.props.cols} cols
        <button onClick={this.props.changeNumCols(-1)}>-</button>
        </div>
      <div><button onClick={this.props.createGrid}>reset</button></div>
    </div>
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Controls)

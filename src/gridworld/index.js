import React, { Component } from 'react'

import Grid from './components/grid'
import Controls from './components/controls'


export default class GridWorld extends Component {

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Controls/>
        <Grid/>
      </div>
    )
  }
}
/*
Gridworld

gridworld describes an n x m grid which an agent navigates,
trying to get to a terminal state

required:
  - grid ui
  - value of each state
  - run iterations showing new policy

nice to show
  - run agent following policy
    - show cumulative reward
    - show number of steps

further goals
  - walls
  - differing reward w/ reward shown per block
  - adjustable grid
  - positive rewards
*/

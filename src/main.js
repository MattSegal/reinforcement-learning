import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from 'state'
import Header from 'generic/components/header'
import ErrorBoundary from 'generic/components/error'
import GridWorld from 'gridworld'

class Main extends Component {

  render() {
    return (
      <Provider store={store}>
        <div style={{ width: '100%', height: '100%' }}>
          <ErrorBoundary>
            <Header/>
            <div className="content">
              <GridWorld/>
            </div>
          </ErrorBoundary>
        </div>
      </Provider>
    )
  }
}


ReactDOM.render(<Main/>, document.getElementById('app'))

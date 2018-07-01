import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger }  from 'redux-logger'

import gridworldReducer from 'gridworld/reducer'
import gridworldState from 'gridworld/state'


const loggerMiddleware = createLogger()
const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware)
const initialState = {
    grid: gridworldState,
}
const reducer = (state, action) => gridworldReducer(state, action)
const store = createStore(reducer, initialState, middleware)
module.exports = store

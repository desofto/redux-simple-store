import React from 'react'
import { createStore } from 'redux'

function Store(state) {
  const store = this[null] = createStore(function(state, action) {
    return { ...state, ...action.change }
  }, state)

  Object.keys(state).forEach(name => {
    Object.defineProperty(this, name, {
      get: function() {
        const state = store.getState()
        return state[name]
      },

      set: function(value) {
        store.dispatch({ type: "update", change: { [name]: value } })
      }
    })
  })
}

Store.subscribe = function(store, callback) {
  return store[null].subscribe(() => {
    if (typeof callback === 'function' ) {
      callback(store[null].getState())
    } else if (typeof callback === 'object') {
      callback.forceUpdate()
    }
  })
}

function useStore(store, reducer) {
  const [lastState, setLastState] = React.useState(reducer(store[null].getState()))

  React.useEffect(() => {
    const unsubscribe = Store.subscribe(store, state => {
      const newState = reducer(state)
      if (newState !== lastState) {
        setLastState(newState)
      }
    })

    return () => unsubscribe()
  })

  return lastState
}

export { Store, useStore }

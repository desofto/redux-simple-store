import React from 'react'
import { createStore } from 'redux'

class Store {
  constructor(state) {
    this.store = createStore(function(state, action) {
      return { ...state, ...action.change }
    }, state)

    Object.keys(state).forEach(name => {
      Object.defineProperty(this, name, {
        get: function() {
          const state = this.store.getState()
          return state[name]
        },

        set: function(value) {
          this.store.dispatch({ type: "update", change: { [name]: value } })
        }
      })
    });
  }

  subscribe(callback) {
    return this.store.subscribe(() => {
      callback(this.store.getState())
    })
  }
}

function useStore(reducer) {
  const [lastState, setLastState] = React.useState(null)

  React.useEffect(() => {
    const unsubscribe = store.subscribe(state => {
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

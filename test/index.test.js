import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({adapter: new Adapter()})

import { Store, useStore } from '../'

describe('redux-simple-store', () => {
  it('works for class components', () => {
    const store = new Store({ passed: false })
    expect(store.passed).toEqual(false)

    const mockFn = jest.fn()
    Store.subscribe(store, mockFn)

    const mockObj = { forceUpdate: jest.fn() }
    Store.subscribe(store, mockObj)

    store.passed = true
    expect(store.passed).toEqual(true)

    expect(mockFn).toBeCalledWith({ passed: true })
    expect(mockObj.forceUpdate).toBeCalled()
  })

  it('works for functional components', () => {
    const store = new Store({ passed: false })

    function Test() {
      const passed = useStore(store, state => state.passed)

      return (
        <div>{store.passed ? "true" : "false"}</div>
      )
    }

    const wrapper = shallow(
      <Test />
    )

    expect(wrapper.html()).toEqual("<div>false</div>")

    store.passed = true
    wrapper.setProps() // To force re-render

    expect(wrapper.html()).toEqual("<div>true</div>")
  })
})

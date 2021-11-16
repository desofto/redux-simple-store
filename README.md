# redux-simple-store


Just install the package:

```
npm i --save redux-simple-store
```

Create your store:

```
import Store from 'redux-simple-store'

export default new Store({
  count: null,
})
```

Now you can use your store either in class component or function component:

```
import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

function App() {
  const count = useStore(state => state.count)

  useEffect(() => {
    const timer = setInterval(() => {
      store.count = store.count + 1
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {count}
      <Button onClick={() => store.count = count + 1}>inc</Button>
      <Button onClick={() => store.count = store.count - 1}>dec</Button>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

In class component you need:
```
  componentDidMount() {
    this.unsubscribe = store.subscribe(state => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
```

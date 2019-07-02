import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Routes from './Routes'

const render = (Component) => {
  window.__DEBUG__ = true
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(Routes)

if (module.hot) {
  module.hot.accept('./Routes', () => {
    const newApp = require('./Routes')
    render(newApp.default)
  })
}

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

let myApp = ReactDOM.render(<App/>, document.getElementById('root'))

function onUpdate () {
	myApp.setState({all: {
		...myApp.state.all,
		update: true
	}})
	window.setTimeout(() => {
		myApp.setState({all: {
			...myApp.state.all,
			update: false
		}})
	}, 30000)
}

registerServiceWorker(onUpdate)

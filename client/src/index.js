import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import './styles/style.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('wrapper'))
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)

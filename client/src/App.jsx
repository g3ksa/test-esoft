import React from 'react'
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import {Container} from './components/container'
import {useAuth} from "./hooks/auth.hook"
import 'materialize-css'
import {AuthContext} from "./context/auth.context"


const App = () => {
	const {token, login, logout, userId} = useAuth()
	const isAuth = !!token
	const routes = useRoutes(isAuth)
	return (
		<AuthContext.Provider
			value={{
				token, login, logout, userId, isAuth
			}}
		>
			{routes}
		</AuthContext.Provider>
	);
};

export default App;

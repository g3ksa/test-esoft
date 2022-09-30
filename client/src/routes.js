import React from "react"
import {Routes, Route, Navigate} from 'react-router-dom'
import MainPage from './pages/MainPage'
import AuthPage from './pages/AuthPage'
import RegisterPage from './pages/RegisterPage'
import {Layout} from "./components/Layout";
import TodoPage from "./pages/TodoPage";
import CreatePage from "./pages/CreatePage";

export const useRoutes = (isAuth) => {
	if (isAuth) {
		return(
			<Routes>
				<Route path="/ToDos" element={<Layout/>}>
					<Route index element={<TodoPage/>}/>
					<Route path="create" element={<CreatePage/>}/>
				</Route>
			</Routes>
		)
	}
	console.log('+')
	return(
		<Routes>
			<Route path="/auth" element={<AuthPage/>}/>
			<Route path='*' element={<Navigate to='/auth'/>}/>
			<Route path='/register' element={<RegisterPage/>}/>
		</Routes>
	)
}
import {useState, useCallback, useEffect, useContext} from "react";
import {AuthContext} from "../context/auth.context";
import {useNavigate} from "react-router-dom";

const storageName = 'userData'

export const useAuth = () => {
	const [token, setToken] = useState(null)
	const [userId, setUserId] = useState(null)
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const login = useCallback((jwtToken, id) => {
		setToken(jwtToken)
		setUserId(id)
		localStorage.setItem(storageName, JSON.stringify({
			userId: id, token: jwtToken
		}))
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		auth.isAuth = false;
		localStorage.removeItem(storageName)
	}, [])

	let decodeToken;
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))

		if (data && data.token){
			const base64Url = data.token.split('.')[1]
			const base64 = decodeURIComponent(atob(base64Url)
				.split('').map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			}).join(''))

			 decodeToken = JSON.parse(base64)
		}

		if (data && data.token && !(decodeToken.exp + '000' < Date.now())) {
			login(data.token, data.userId)
			navigate(-1)
		}else{
			logout()
		}
	}, [])

	return {login, logout, token, userId, decodeToken}
}
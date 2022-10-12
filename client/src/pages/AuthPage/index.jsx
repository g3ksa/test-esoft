import { useEffect, useState, useContext, FC } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import styles from '../AuthPage/auth.module.scss'
import { AuthContext } from '../../context/auth.context'
import * as React from 'react'

const Index = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const { loading, error, request, clearError } = useHttp()
	const [errors, setErrors] = useState('')
	const [authForm, setAuthForm] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		setErrors(error)
		const timer = setTimeout(() => {
			setErrors('')
			clearError()
		}, 4000)
		return () => {
			clearTimeout(timer)
		}
	}, [error, clearError])

	const changeHandler = (event) => {
		setAuthForm({ ...authForm, [event.target.name]: event.target.value })
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...authForm })
			auth.login(data.token, data.userId)
			navigate('/ToDos')
		} catch (e) {}
	}

	return (
		<div className={styles.block}>
			<div className={styles.row}>
				<div>
					<div>
						<div className={styles.title}>Авторизация</div>
						<div className={styles.error}>{errors}</div>
						<div className={styles.group}>
							<input
								id='email'
								type='email'
								name='email'
								className={styles.input}
								placeholder=' '
								onChange={changeHandler}
							/>
							<label htmlFor='email' className={styles.label}>
								Email
							</label>
						</div>

						<div className={styles.group}>
							<input
								id='password'
								type='password'
								name='password'
								className={styles.input}
								placeholder=' '
								onChange={changeHandler}
							/>
							<label htmlFor='password' className={styles.label}>
								Пароль
							</label>
						</div>
					</div>
					<div className='card-action'>
						<button
							className={styles.logBtn}
							disabled={loading}
							onClick={loginHandler}
						>
							Войти
						</button>
						<Link
							className={styles.regBtn}
							disabled={loading}
							to='/register'
						>
							Регистрация
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Index

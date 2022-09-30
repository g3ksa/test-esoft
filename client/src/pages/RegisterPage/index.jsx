import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import styles from './register.module.scss'
import {useHttp} from '../../hooks/http.hook'

const RegisterPage = () => {
	const {loading, error, request, clearError} = useHttp()
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('');
	const [regForm, setRegForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	})

	useEffect(() => {
		setErrorMessage(error)
		const timer = setTimeout(() => {
			setErrorMessage('')
			clearError()
		}, 4000)
		return () => {
			clearTimeout(timer)
		}
	},[error, clearError]);


	const changeHandler = event => {
		setRegForm({...regForm, [event.target.name]: event.target.value})
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...regForm})
			setSuccessMessage(data)

			return setTimeout(() => {
				setSuccessMessage('')
			}, 4000)
		}catch (e) {}
	}

	return (
		<div className={styles.block}>
			<div className={styles.row}>
				<div>
					<div className={styles.form}>
						<div className={styles.title}>Регистрация</div>
						<div className={styles.error}>
							{errorMessage}
						</div>
						<div className={styles.success}>
							{successMessage}
						</div>
						<div className={styles.group}>
							<input
								id="name"
								type="text"
								name="firstName"
								className={styles.input}
								placeholder=" "
								onChange={changeHandler}
							/>
							<label htmlFor="name" className={styles.label}>Имя</label>
						</div>

						<div className={styles.group}>
							<input
								id="surName"
								type="text"
								name="lastName"
								className={styles.input}
								placeholder=" "
								onChange={changeHandler}
							/>
							<label htmlFor="surName" className={styles.label}>Фамилия</label>
						</div>

						<div className={styles.group}>
							<input
								id="email"
								type="email"
								name="email"
								className={styles.input}
								placeholder=" "
								onChange={changeHandler}
							/>
							<label htmlFor="email" className={styles.label}>Email</label>
						</div>

						<div className={styles.group}>
							<input
								id="password"
								type="password"
								name="password"
								className={styles.input}
								placeholder=" "
								onChange={changeHandler}
							/>
							<label htmlFor="password" className={styles.label}>Пароль</label>
						</div>
					</div>
					<div className="card-action">
						<button
							className={styles.button}
							onClick={registerHandler}
							disabled={loading}
						>
							Зарегистрироваться
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;

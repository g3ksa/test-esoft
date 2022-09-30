import React, {useContext, useEffect, useState} from 'react';
import styles from "./createpage.module.scss";
import {useHttp} from "../../hooks/http.hook";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/auth.context";

const CreatePage = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const {loading, error, request, clearError} = useHttp()
	const [errors, setErrors] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [regForm, setRegForm] = useState({
		title: '',
		description: '',
		deadline: '',
		priority: '',
		creator: auth.userId,
		responsible: '',
	})
	const options = ['низкий', 'средний', 'высокий']

	useEffect(() => {
		setErrors(error)
		const timer = setTimeout(() => {
			setErrors('')
			clearError()
		}, 4000)
		return () => {
			clearTimeout(timer)
		}
	},[error, clearError]);


	const changeHandler = event => {
		setRegForm({...regForm, [event.target.name]: event.target.value})
	}

	const createHandler = async () => {
		try {
			console.log(regForm)
			const data = await request('/api/ToDo/create', 'POST', {...regForm})
			setSuccessMessage(data)

			return setTimeout(() => {
				setSuccessMessage('')
				navigate('/ToDos')
			}, 2000)
		}catch (e) {}
	}

	return (
		<div className={styles.block}>
			<div className={styles.row}>
				<div className={styles.form}>
					<div className={styles.title}>Создание задачи</div>
					<div className={styles.error}>
						{errors}
					</div>
					<div className={styles.success}>
						{successMessage}
					</div>
					<div className={styles.group}>
						<input
							id="title"
							type="text"
							name="title"
							className={styles.input}
							placeholder=" "
							onChange={changeHandler}
						/>
						<label htmlFor="title" className={styles.label}>Заголовок</label>
					</div>

					<div className={styles.group}>
						<input
							id="description"
							type="text"
							name="description"
							className={styles.input}
							placeholder=" "
							onChange={changeHandler}
						/>
						<label htmlFor="description" className={styles.label}>Описание</label>
					</div>

					<div className={styles.group}>
						<input
							id="deadline"
							type="date"
							name="deadline"
							min={new Date().toLocaleDateString('en-ca')}
							className={styles.input}
							placeholder=" "
							onChange={changeHandler}
						/>
						<label htmlFor="deadline" className={styles.label}>Дата окончания</label>
					</div>

					<div className={styles.group}>
						<input
							id="priority"
							type="text"
							name="priority"
							className={styles.input}
							placeholder=" "
							onChange={changeHandler}
						/>
						<label htmlFor="priority" className={styles.label}>
							Приоритет (низкий, средний, высокий)
						</label>
					</div>

					<div className={styles.group}>
						<input
							id="responsible"
							type="email"
							name="responsible"
							className={styles.input}
							placeholder=" "
							onChange={changeHandler}
						/>
						<label htmlFor="responsible" className={styles.label}>Ответственный (email)</label>
					</div>

				</div>
				<div className="card-action">
					<button
						className={styles.button}
						onClick={createHandler}
						disabled={loading}
					>
						Создать задачу
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;

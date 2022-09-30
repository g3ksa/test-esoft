import React, { useContext, useEffect, useState, useCallback } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useHttp } from '../../hooks/http.hook'

import styles from './todoPage.module.scss'

const TodoPage = () => {
	const auth = useContext(AuthContext)
	const { loading: isLoading, request } = useHttp()
	const [todos, setTodos] = useState([])
	const [filter, setFilter] = useState(null)

	const fetchTodos = useCallback(async () => {
		try {
			const data = await request('/api/ToDo', 'POST', { id: auth.userId })
			setTodos(data.Todos)
		} catch (e) {
			console.log(e)
		}
	}, [request])

	useEffect(() => {
		fetchTodos()
	}, [fetchTodos])

	const normalizeDate = (date) => {
		const [year, month, day] = date
		const dateTemp = new Date(year, month - 1, day)

		return dateTemp.toLocaleDateString()
	}

	const getDate = (date) => {
		const [year, month, day] = date
		const dateTemp = new Date(year, month - 1, day, 23, 59, 59)

		return dateTemp
	}

	return (
		<>
			{isLoading ? (
				<div className={styles.loading}>Загрузка...</div>
			) : todos.length === 0 ? (
				<div>Задач нет</div>
			) : (
				<div className={styles.list}>
					{todos.map((todo) => (
						<div className={styles.item} key={todo.id}>
							<div className={styles.title}>{todo.title}</div>
							<div className={styles.description}>
								{todo.description}
							</div>
							<div className={styles.options}>
								<div
									className={styles.deadline}
									data-isCompleted={
										getDate(
											todo.deadline.substring(0, 10).split('-')
										) < new Date()
									}
								>
									{normalizeDate(
										todo.deadline.substring(0, 10).split('-')
									)}
								</div>
								<div className={styles.priority}>{todo.priority}</div>
							</div>
							<div className={styles.btn}>
								<a href='#' className={styles.editBtn}>
									Редактировать
								</a>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	)
}

export default TodoPage

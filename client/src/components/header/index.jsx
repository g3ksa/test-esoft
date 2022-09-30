import React, {useContext} from 'react'
import {useNavigate} from "react-router-dom";
import classNames from 'classnames'

import styles from './header.module.scss'
import CustomLink from "../CustomLink";
import {AuthContext} from "../../context/auth.context";

const Header = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate();
	const logoutHendler = event => {
		event.preventDefault()
		auth.logout()
		navigate('/')
	}

	return (
		<div className={styles.main}>
			<div className={styles.row}>
				<div className={styles.logo}>ToDo App</div>
				<div className={styles.navbar}>
					<ul className={styles.items}>
						<li className={styles.item}>
							<CustomLink to="/ToDos">Все задачи</CustomLink>
						</li>
						<li className={styles.item}>
							<CustomLink to="create">Создать задачу</CustomLink>
						</li>
						<li className={classNames(styles.item)}>
							<a href="#" onClick={logoutHendler} className={styles.logoutBtn}>Выход</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Header

import React from 'react';
import styles from './container.module.scss';

export const Container = (props) => {
	const { children } = props;

	return (
		<div className={styles.container} {...props}>
			{children}
		</div>
	);
};
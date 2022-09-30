const {Router} = require('express')
const {check} = require('express-validator')
const router = new Router()
const todoController = require('../controllers/todo.controller')

const getMaxDay = (year, month) => {
	const date1 = new Date(year, month-1, 1)
	const date2 = new Date(year, month, 1)

	return Math.round((date2 - date1) / 1000 / 3600 / 24)
}

router.post(
	'/create',
	[
		check('responsible', 'Некторректный email ответственного').isEmail(),
		check('deadline', 'Некорректная дата окончания задачи').custom(value => {
			const [year, month, day] = value.split('-')
			const maxDayInMonth = getMaxDay(year, month)
			const dateNow = new Date()

			return !(+day > maxDayInMonth
						|| +month > 12
						|| year.length < 4
						|| new Date(year, month-1, day) < dateNow)

		})
	],
	todoController.creteToDo
)

router.post(
	'/',
	todoController.findAll
)

module.exports = router
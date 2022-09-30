const personService = require('../service/person')
const todoService = require('../service/ToDo')
const {validationResult} = require('express-validator')
const db = require('../DataBase/db')
const config = require('config')

class TodoController{
	async creteToDo(req, res){
		try{
			const errors = validationResult(req)

			if(!errors.isEmpty()){

				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при создании задачи'
				})
			}

			const {title, description, deadline, priority, creator, responsible} = req.body
			const [year, month, day] = deadline.split('-')

			const responsibleId = await personService.findOne(responsible)

			if (!responsibleId){
				return res.status(400).json('Такого пользователя(ответственный) не существует')
			}

			const todo = await todoService.createToDo({
				title,
				description,
				deadline: new Date(year, month - 1, day),
				priority,
				status: 'к выполнению',
				creator,
				responsible: responsibleId
			})

			res.status(200).json('Задача создана')
		}catch (e) {
			console.log(e)
			res.status(500).json('something went wrong...')
		}
	}

	async findAll(req, res){
		const {id} = req.body

		const todos = await todoService.findAll({
			userId: id
		})

		res.status(200).json({
			Todos: todos,
			message: 'Успешно'
		})
	}
}

module.exports = new TodoController()


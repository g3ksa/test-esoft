const personService = require('../service/person')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const db = require('../DataBase/db')
const config = require('config')

class PersonController{
	async register(req, res) {
		try{
			const errors = validationResult(req)

			if(!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при регистрации'
				})
			}

			const {firstName, lastName, email, password} = req.body

			const candidate = await personService.findOne(email)

			if (candidate) {
				return res.status(400).json('Такой пользователь уже существует')
			}

			const hashedPassword = await bcrypt.hash(password, 12)

			const user = personService.createPerson({
				firstName,
				lastName,
				email,
				password: hashedPassword
			})

			res.status(200).json('Пользователь создан')
		}catch (e) {
			console.log(e)
			res.status(500).json('something went wrong...')
		}
	}

	async login(req, res){
		try{
			const errors = validationResult(req)

			if(!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при входе в систему'
				})
			}

			const {email, password} = req.body

			const userInfoFromDB = await db('person')
				.select('id', 'password')
				.where('email', email)
				.then((user) => {
					return user[0]
				})

			const user = personService.findOne({email})

			if (!user){
				return res.status(400).json('Пользователь не найден')
			}

			const isMatch = await bcrypt.compare(
				password,
				userInfoFromDB.password
			)

			if(!isMatch) {
				return res.status(400).json('Неверный пароль, попробуйте еще раз')
			}

			const token = jwt.sign(
				{ userId: userInfoFromDB.id, email },
				config.get('jwtSecret'),
				{ expiresIn: '3d'}
			)

			res.json({token, userId: userInfoFromDB.id})

		}catch (e) {
			console.log(e)
			res.status(500).json('something went wrong...')
		}
	}

	async test(req, res) {
		try{
			const {email} = req.body

			const id = await personService.findOne(email)

			res.json(id)
		}catch (e) {
			console.log(e)
			res.status(500).json('something went wrong...')
		}
	}
}

module.exports = new PersonController()
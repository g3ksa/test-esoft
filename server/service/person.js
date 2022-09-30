const db = require("../DataBase/db")

class PersonService{
	async createPerson(options) {
		const {firstName, lastName, email, password } = options

		const [id] = await db('person')
			.insert({
				name: firstName,
				surname: lastName,
				email,
				password
			})
			.returning('id')

		return id
	}

	async findOne(email){
		const id = await db('person')
			.where('email', email)
			.then((user) => {
				return user[0].id
			})
			.catch(() => {
				return 0
			})

		return id
	}

}

module.exports = new PersonService()
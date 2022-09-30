const express = require('express')
const config = require('config')
const auth = require('./routes/auth.route')
const todo = require('./routes/todo.route')
const app = express()

const PORT = config.get('port') || 3000

app.use(express.json({extended: true}))
app.use('/api/auth', auth)
app.use('/api/ToDo', todo)

function start() {
	try{
		app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
	}catch (e) {
		console.log('Server error', e.message)
		process.exit(1)
	}
}

start()
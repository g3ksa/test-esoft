const db = require('../DataBase/db');
const personService = require('./person');

class ToDoService {
   async createToDo(options) {
      const {
         title,
         description,
         deadline,
         priority,
         status,
         creator,
         responsible,
      } = options;

      const [id] = await db('ToDo')
         .insert({
            title,
            description,
            deadline,
            priority,
            status,
            creator,
            responsible,
         })
         .returning('id');

      return id;
   }
   async findAll({ userId }) {
      const todos = await db('ToDo')
         .where('creator', userId)
         .orWhere('responsible', userId)
         .then((todos) => {
            return todos;
         })
         .catch(() => {
            return [];
         });

      return todos;
   }
}

module.exports = new ToDoService();

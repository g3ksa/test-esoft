exports.up = function(knex) {
	return knex.schema.createTable('ToDo', table => {
		table.increments('id').primary()
		table.string('title').notNullable()
		table.string('description').notNullable()
		table.dateTime('deadline').notNullable()
		table.string('priority').notNullable()
		table.string('status').notNullable()
		table
			.integer('creator')
			.references('id')
			.inTable('person')
		table
			.integer('responsible')
			.references('id')
			.inTable('person')
		table.timestamps(true, true)
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('ToDo')
};

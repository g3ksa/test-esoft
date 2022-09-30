
exports.up = function(knex) {
	return knex.schema.createTable('person', table => {
		table.increments('id').primary()
		table.string('name').notNullable()
		table.string('surname').notNullable()
		table.string('email').notNullable().unique()
		table.string('password').notNullable()
		table
			.integer('leader')
			.references('id')
			.inTable('person')
		table.timestamps(true, true)
	})
};


exports.down = function(knex) {
	return knex.schema.dropTable('person')
};
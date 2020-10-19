
exports.up = function(knex) {
  return knex.schema
    .createTable('characters', (table) => {
        table.integer('id').notNullable().unique().primary();
        table.string('name');
        table.string('birthday');
    })
    .createTable('occupations', (table) => {
      table.increments()
      table.integer('char_id').references('characters.id').notNullable();
      table.string('occupation').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('occupations')
    .dropTableIfExists('characters')
};

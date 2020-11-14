exports.up = function(knex) {
  return knex.schema.createTable('leads', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.timestamp('data_sync', { useTz: true }, { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('leads');
};

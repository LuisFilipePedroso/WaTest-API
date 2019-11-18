import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Orders', table => {
    table.increments('id').primary();
    table.string('description', 255).notNullable();
    table.integer('quantity').notNullable();
    table.float('value', 15, 2);
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Orders');
}

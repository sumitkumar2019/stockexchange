
exports.up = function(knex, Promise) {
  return knex.schema.createTable('stock', (table)=>{
     table.increments();
     table.text('companyId').notNullable();
      table.text('countries').notNullable();
      table.text('budget').notNullable();
      table.text('bid').notNullable();
      table.text('category').notNullable();
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('stock');
};

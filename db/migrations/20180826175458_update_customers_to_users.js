
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('customers', 'users')
  .then(() => {
    return knex.schema.table('users', function(table){
      table.string('type');
    })
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('type')
  })
  .then(() => {
    return knex.schema.renameTable('users', 'customers');
  });
};

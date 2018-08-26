
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(table){
    table.dropColumn('created_at');
    table.timestamp('ordered_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function(table){
    table.dropColumn('ordered_at');
    table.time('created_at').defaultTo(knex.fn.now());
  });
};

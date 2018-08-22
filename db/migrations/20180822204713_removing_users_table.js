
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.createTable('menu', function(table){
      table.increments();
      table.string('name');
      table.string('description');
      table.string('type');
      table.float('price');
      table.string('img_url', 500);
      table.integer('order_time_estimate');
    })
    ]);

};

exports.down = function(knex, Promise) {

};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu', function(table){
      table.increments();
      table.string('name');
      table.string('description');
      table.string('type');
      table.float('price');
      table.string('img_url', 500);
      table.integer('order_time_estimate');
    }).then(res => {
      return knex.schema.createTable('customers', function(table){
        table.increments();
        table.string('name');
        table.string('phone_num', 10);
      })
    }).then(res => {
        return knex.schema.createTable('orders', function (table){
          table.increments();
          table.integer('customer_id');
          table.foreign('customer_id').references('customers.id');
          table.time('created_at').defaultTo(knex.fn.now());
          // in minutes
          table.integer('estimated_time');
        })
    });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('menu'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('customers')
    ]);

};

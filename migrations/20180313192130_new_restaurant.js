exports.up = function (knex, Promise) {

    return knex.schema
        .createTableIfNotExists('Restaurants', function (restaurants) {
            restaurants.increments('id').primary();
            restaurants.string('name')
                .unique()
                .notNullable()
            restaurants.string('address')
                .unique()
                .notNullable()
            restaurants.string('hours')
                .notNullable()
        })

        .createTableIfNotExists('Tables', function (tables) {
            tables.increments('id').primary();
            tables.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            tables.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            tables
                .integer('Restaurant_id')
                .references('id')
                .inTable('Restaurants')
                .notNull()
                .onDelete('cascade');
            tables.integer('total_pax')
                .notNullable()
            tables.integer('current_pax')
                .defaultTo(0)
        })
};


exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('Tables')
        .dropTable('Restaurants');
};

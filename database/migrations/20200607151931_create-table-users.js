
exports.up = async function (knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('tenant_id').notNullable()
    table.string('name').notNullable()
  })

  await knex.raw('ALTER TABLE users ENABLE ROW LEVEL SECURITY')

  return knex.raw(`CREATE POLICY tenant_isolation_policy ON users
                     USING (tenant_id = current_setting('app.current_tenant'))`)
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}


exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { tenant_id: 'tenant1', name: 'John' },
        { tenant_id: 'tenant1', name: 'Doe' },
        { tenant_id: 'tenant1', name: 'Foo' },
        { tenant_id: 'tenant2', name: 'Bar' },
        { tenant_id: 'tenant2', name: 'Lorem' },
        { tenant_id: 'tenant2', name: 'Ipsum' },
        { tenant_id: 'tenant3', name: 'Dolor' },
        { tenant_id: 'tenant3', name: 'Sit' },
        { tenant_id: 'tenant3', name: 'Amet' }
      ])
    })
}

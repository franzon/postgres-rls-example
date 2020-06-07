const Knex = require('knex')

const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]

class TenantDatabaseManager {
  constructor () {
    this.knexCache = new Map()
  }

  getKnexForRequest (req) {
    const { tenant_id: tenantId } = req.query

    if (!tenantId) {
      return null
    }

    let knex = this.knexCache.get(tenantId)

    if (!knex) {
      knex = Knex(this.knexConfigForTenant(tenantId))
      this.knexCache.set(tenantId, knex)
    }

    return knex
  }

  knexConfigForTenant (tenantId) {
    return {
      ...config,
      pool: {
        afterCreate: (conn, done) => {
          conn.query(`SET app.current_tenant = ${tenantId}`, done)
        }
      }
    }
  }
}

module.exports = TenantDatabaseManager

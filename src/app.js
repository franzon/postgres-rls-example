const express = require('express')

const usersController = require('./controllers/users')
const TenantDatabaseManager = require('./utils/tenantDatabaseManager')

class Application {
  constructor () {
    this.app = express()

    this.setupTenantDatabaseManager()
    this.setupRoutes()
  }

  setupRoutes () {
    this.app.use('/users', usersController)
  }

  setupTenantDatabaseManager () {
    const tenantDatabaseManager = new TenantDatabaseManager()

    this.app.use((req, res, next) => {
      const knex = tenantDatabaseManager.getKnexForRequest(req)

      if (!knex) {
        return res.status(500).json({ error: 'Error getting database connection for tenant' })
      }

      req.knex = knex

      next()
    })
  }

  listen (port, callback) {
    this.app.listen(port, callback)
  }
}

module.exports = Application
